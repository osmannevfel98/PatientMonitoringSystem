import Main from '../models/main';
import PatientInfos from '../models/PatientInfos';

export const MAIN = [
    new Main ('c1', 'Covid-19', '#f08080'),
    new Main ('c2', 'Others', '#f08080')
];

export const PATIENTS = [
    new PatientInfos('m1', ['c1'], 'Test-1',27, 88, 98.8, 36.7, 65,),
    new PatientInfos('m2', ['c1','c2'], 'Test-2',54, 80, 99, 37.1, 60),
    new PatientInfos('m3', ['c1'], 'Test-3', 11, 91, 94, 37.2, 40),
    new PatientInfos('m4', ['c2'], 'Name Surname-4', 45, 78, 96.7, 36.1, 71),
    new PatientInfos('m5', ['c1'], 'Name Surname-5', 34, 91, 99.7, 36.8, 79),
    new PatientInfos('m6', ['c1'], 'Name Surname-6', 35, 97, 98.0, 37.1, 69),
    new PatientInfos('m7', ['c1'], 'Name Surname-7', 23, 78, 98.9, 38.7, 72),
    new PatientInfos('m8', ['c2'], 'Name Surname-8', 54, 76, 96.1, 39.1, 80),
    new PatientInfos('m9', ['c1','c2'], 'Name Surname-9', 51, 94, 97.4, 36.4, 64),
    new PatientInfos('m10', ['c1'], 'Name Surname-10', 75, 88, 99.3, 37.0, 63),
    new PatientInfos('m11', ['c2'], 'Name Surname-11', 34, 84, 100.0, 36.5, 73),
    new PatientInfos('m12', ['c1'], 'Name Surname-12', 56, 78, 99.2, 36.9, 72),
    new PatientInfos('m13', ['c2'], 'Name Surname-13', 73, 95, 98.6, 36.9, 75),
    new PatientInfos('m14', ['c1'], 'Name Surname-14', 21, 65, 98.8, 35.7, 69),
    new PatientInfos('m15', ['c2'], 'Name Surname-15', 6, 67, 99.1, 37.8, 81),
    new PatientInfos('m16', ['c2'], 'Name Surname-16', 75, 87, 98.6, 36.2, 73),
    new PatientInfos('m17', ['c1','c2'], 'Name Surname-17', 32, 87, 95.7, 36.7, 69),
    new PatientInfos('m18', ['c1'], 'Name Surname-18', 57, 81, 98.4, 37.3, 63),
    new PatientInfos('m19', ['c2'], 'Name Surname-19', 76, 90, 98.0, 36.9, 75),
    new PatientInfos('m20', ['c1'], 'Name Surname-20', 57, 79, 99.3, 37.0, 80)
];