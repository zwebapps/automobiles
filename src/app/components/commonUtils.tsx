export  const getImage = (data: string) => {
    if(data) {
        const postData = JSON.parse(data);
        return  `/uploads/${postData.image}`;
    } else {
        return ""
    }
}

export const getImageUrl = (image: string) => {
    if(image) {
        return  `/uploads/${image}`;
    } else {
        return ""
    }
}