const getImage = (img, setState, key="image") => {
    const Fr = new FileReader();
    Fr.readAsDataURL(img);
 
    Fr.addEventListener('load', (a) => {
        setState((state) => ({
            ...state,
            [key]: a.target.result
        }));
    })
}

export default getImage;