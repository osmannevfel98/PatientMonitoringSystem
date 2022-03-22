const { initializeApp } = require("firebase/app");

const { getDatabase, ref, set, get, child } = require("firebase/database");
const express = require("express");
const app = express();
app.use(express.json());

const firebaseConfig = {
  apiKey: "AIzaSyCIICOaw2B767hR1b-GqctOmPSFa-8CuFM",
  authDomain: "patientms-fa247.firebaseapp.com",
  databaseURL:
    "https://patientms-fa247-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "patientms-fa247",
  storageBucket: "patientms-fa247.appspot.com",
  messagingSenderId: "530163268335",
  appId: "1:530163268335:web:0b82715112aa039af1391a",
  measurementId: "G-NPGNE2290L",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getDatabase(firebaseApp);

app.get("/", async (req, res) => {
  console.log("get request");
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        res.status(200).json({
          status: "success",
          data: snapshot,
        });
      } else {
        res.status(500).json({
          status: "error",
          message: "No data found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: error,
      });
    });
});

app.post("/", async (req, res) => {
  const { name, email, userId } = req.body;

  try {
    set(ref(db, "users/" + userId), {
      name,
      email,
    });

    res.status(200).json({
      status: "success",
      data: "insterted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
});

app.put("/", (req, res) => {
  const db = getDatabase();
  const { name, email, userId } = req.body;
  // A post entry.
  const updatedUser = {
    name,
    email,
  };
  set(ref(db, "users/" + userId), updatedUser)
    .then(() => {
      res.status(200).json({
        status: "success",
        data: {
          name,
          email,
        },
      });
    })
    .catch((error) => {
      // The write failed...
      res.status(400).json({
        status: "error",
        message: error,
      });
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
