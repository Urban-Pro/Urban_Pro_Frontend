import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB6Xgi55mTqUi4kGIGJp8rDxKOoA4JwsJk",
    authDomain: "urbanproapp.firebaseapp.com",
    projectId: "urbanproapp",
    storageBucket: "urbanproapp.appspot.com",
    messagingSenderId: "735320953841",
    appId: "1:735320953841:web:e7dfa35b12dd042a336a50",
    measurementId: "G-M76BC05VQ5"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadFile = async (file, email, onProgress) => {
  const storageRef = ref(storage, email);
  const fileRef = ref(storageRef, file.name);
  const uploadTask = uploadBytesResumable(fileRef, file);
  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Progreso de la subida
        onProgress(snapshot); // Llamamos a la función de callback con el objeto snapshot
      }, 
      (error) => {
        // Error en la subida
        console.error(`Error al subir archivo ${file.name}: ${error}`);
        reject(error);
      }, 
      async () => {
        // Subida completada
        console.log(`Archivo ${file.name} subido correctamente`);
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const fileInfo = {
          name: file.name,
          size: file.size,
          type: file.type,
          downloadURL,
        };
        resolve(fileInfo);
      }
    );
  });
};

export { uploadFile };