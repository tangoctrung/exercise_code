import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebase';

export const functionUploadFile = async (e:any, branchId: string) => {
    console.log(e);
    let urlTool
    let file = e.target?.files[0];
    if (!file) {
        alert("Please choose a file first!");
    }
    const storageRef = ref(storage, `/imageTool/${branchId}/${new Date().getTime()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    await uploadTask.on(
        "state_changed",
        (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                console.log('Upload is paused');
                break;
                case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (err) => console.log(err),
        () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log(url);
                urlTool = url;
            });
        }
    );
    return urlTool;

}