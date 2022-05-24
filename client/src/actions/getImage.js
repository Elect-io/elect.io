const getImage = (img, setState) => {
    const Fr = new FileReader();
    Fr.readAsDataURL(img);
 
    Fr.addEventListener('load', (a) => {
        setState((state) => ({
            ...state,
            image: a.target.result
        }));
    })
}

export default getImage;