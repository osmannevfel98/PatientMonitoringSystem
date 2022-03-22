#include <Arduino.h>
//#include <dht.h>
#if defined(ESP32)
  #include <WiFi.h>
#endif
#include <Firebase_ESP_Client.h>
//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "testNetwork"
#define WIFI_PASSWORD "bitirmeProj123"

// Insert Firebase project API Key
#define API_KEY "AIzaSyCIICOaw2B767hR1b-GqctOmPSFa-8CuFM"

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "https://patientms-fa247-default-rtdb.europe-west1.firebasedatabase.app/"

// Sample size
#define SAMPLESIZE 16

//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

//Define DHT11 object
//dht DHT;
//#define DHT11_PIN 7

unsigned long sendDataPrevMillis = 0;
int count = 0;
bool signupOK = false;
int Oxygen[8] = {0};
int Temperature[8] = {0};
int runThrough = 0;
const int redLed = 10, irLed = 11; // RED & IR LED INPUT PINS
const int filterOut = A0; // OUTPUT PIN
float RATA[SAMPLESIZE], IATA[SAMPLESIZE]; //STACK UP DATA FOR 640 MS
float *redMax, *irMax;
int oxygenation;
float retVal[2]; // RETURN VALUE OF findMinMax();



int DHT11_Pin = 14; // DHT11 Data Pin

int Humidity = 0;
int Temp = 0;
int TempComma = 0;
bool DHTError = false; // Checksum Error

// a Delay routine. Call DelayTimer(time in uSec)

void DelayTimer(long int DelayValue);


int fillUpDataArray(int pinNumber, float redValue[SAMPLESIZE], float irValue[SAMPLESIZE]);
void flushArray(int flushedArray[SAMPLESIZE]);
float* findMinMax(float dataArray[SAMPLESIZE]);
float processData(float *ptrRed, float *ptrIR);
void DHT11();

void setup() {
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("ok");
    signupOK = true;
  }
  else {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  pinMode(redLed, OUTPUT);
  pinMode(irLed, OUTPUT);
  pinMode(filterOut, INPUT);
}

void loop() {
  fillUpDataArray(filterOut, RATA, IATA);

  if (runThrough == 8)
  {
    for(runThrough; runThrough>0; runThrough--)
    {
      if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 2000 || sendDataPrevMillis == 0)) {
        sendDataPrevMillis = millis();
        // Write an Int number on the database path test/int
      if (Firebase.RTDB.setInt(&fbdo, "test/oxygen", Oxygen[8-runThrough])) {
        Serial.println("PASSED");
        Serial.println("PATH: " + fbdo.dataPath());
        Serial.println("TYPE: " + fbdo.dataType());
        }
      else {
        Serial.println("FAILED");
        Serial.println("REASON: " + fbdo.errorReason());
        }
      count++;

      /*
      // Write an Float number on the database path test/float
      if (Firebase.RTDB.setFloat(&fbdo, "test/temperature", Temperature[8-runThrough])) {
        Serial.println("PASSED");
        Serial.println("PATH: " + fbdo.dataPath());
        Serial.println("TYPE: " + fbdo.dataType());
      }
      else {
        Serial.println("FAILED");
        Serial.println("REASON: " + fbdo.errorReason());
        }
        */
      }
    }
    flushArray(Oxygen);
    //flushArray(Temperature);
  }

  redMax = findMinMax(RATA);
  float redTemp[2] = {0};
  redTemp[0] = *redMax;
  redTemp[1] = *(redMax+1);

  irMax = findMinMax(IATA);
  float IRTemp[2] = {0};
  IRTemp[0] = *irMax;
  IRTemp[1] = *(irMax+1);

  oxygenation = processData(redTemp, IRTemp);
  Oxygen[runThrough] = oxygenation;
  //Temperature[runThrough] = DHT.read11(DHT11_PIN);

  runThrough++;

  DHT11();
if (DHTError == false){
Serial.print("Humidity = ");
Serial.print(Humidity);
Serial.print("% ");
Serial.print(" Temp = ");
Serial.print(Temp);
Serial.print(",");
Serial.print(TempComma);
Serial.println("°C ");
} 
else 
Serial.println("Error");
DelayTimer(500000); //wait 5 sec
}

int fillUpDataArray(int pinNumber, float redValue[SAMPLESIZE], float irValue[SAMPLESIZE])
{
  for(int i=0; i<2*SAMPLESIZE; i++) // FILL DATA ARRAYS
  {
    if(i%2 == 0)
    {
      digitalWrite(redLed, HIGH);
      delay(16.67);
      redValue[i/2] = analogRead(filterOut);
      digitalWrite(redLed, LOW);
    }
    else
    {
      digitalWrite(irLed, HIGH);
      delay(16.67);
      irValue[(i-1)/2] = analogRead(filterOut);
      digitalWrite(irLed, LOW);
    }
  }
}

void flushArray(int flushedArray[SAMPLESIZE])
{
  for(int i=0; i<SAMPLESIZE; i++)
    flushedArray[i] = 0;
}

float* findMinMax(float dataArray[SAMPLESIZE])
{
  float mini = dataArray[0], maxi = dataArray[0];

  for(int i=1; i<SAMPLESIZE; i++)
  {
    if(dataArray[i] > maxi)
      maxi = dataArray[i];
    else if(mini > dataArray[i])
      mini = dataArray[i];
  }

   retVal[0] = mini;
   retVal[1] = maxi;

   return retVal;
}

float processData(float *ptR, float *ptI)
{
  float *ptrRed = ptR, *ptrIR = ptI;

  float AC660 = *(ptR+1) - *ptR;
  float DC660 = (*(ptR+1) + *ptR) / 2;
  float AC940 = *(ptI+1) - *ptI;
  float DC940 = (*(ptI+1) + *ptI) / 2;

  float preOxy = (AC660 / DC660) / (AC940 / DC940);
  float postOxy = ((-9.3425) * preOxy * preOxy) + 108;

  return postOxy;
}

void DHT11(){

long int DataTime = 0;

byte Result[45];
byte DataArray = 0;
byte DataCounter = 0;
byte DHTData[4];

bool BlockDHT=false;

// Trigger Sensor (described in the Datasheet)

pinMode(DHT11_Pin,OUTPUT);
digitalWrite(DHT11_Pin,HIGH);
DelayTimer(250000); //Wait 250millisec
digitalWrite(DHT11_Pin,LOW);
DelayTimer(30000); //Wait 30millisec
digitalWrite(DHT11_Pin,HIGH);
DelayTimer(50); //Wait 50microsec
pinMode(DHT11_Pin,INPUT);
// read the Bits and put them into a Result array (It will count 42 bits. The first two one are useless due my code)

do {
if (digitalRead(DHT11_Pin) == 0 && BlockDHT == false) {
  BlockDHT = true;
  Result[DataArray]=(micros()-DataTime);
  DataArray++;DataTime=micros();
  } //If DHT pin is low, go to next Dataset
  
if (digitalRead(DHT11_Pin) == 1) {
  BlockDHT = false;
  } // As long as DHT pin is Hight add time in Microseconds to Result

}while((micros()-DataTime) < 150); // if DTH Sensor high for more than 150 usec, leave loop

// Asign 1 or 0 to Result variable. If more than 80uS Data as “1”
// Starting at Data set 02. First two Datasets are ignored!

for (int i=2; i< DataArray; i++) {
if (Result[i] <= 90) Result[i]=0; else Result[i]=1;
//Serial.print(Result[i]);Serial.print(” “);
}
//Serial.println();

for (int j=0; j< 5; j++){ // redo it for the 5 Bytes (40 Databits /8 = 5)
  for (int i=0; i< 8; i++) {
    bitWrite(DHTData[j], 7-i, Result[i+2+(j*8)]);
    } // Create 5 Databytes from the 40 Databits (Ignoring the 2 first Databits)

}
// check checksum }

if (DHTData[4] == (DHTData[0]+DHTData[1]+DHTData[2]+DHTData[3])){
  Humidity = DHTData[0];
  Temp = DHTData[2];
  TempComma = DHTData[3];
  DHTError=false;
  }
else
  DHTError=true; //If Checksum is worng, Temp=99 (Dataset 0-3 in addition = Dataset 4 = Checksum OK)
}

void DelayTimer(long int DelayValue){
long int DelayTime = micros();
do {
}
while (micros()-DelayTime < DelayValue);
}

#undef WIFI_SSID
#undef WIFI_PASSWORD
#undef API_KEY
#undef DATABASE_URL
#undef SAMPLESIZE
//#undef DHT11_PIN
