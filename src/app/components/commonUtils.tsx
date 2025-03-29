export  const getImage = (data: string) => {
    console.log("getImage ", data)
    if(data) {
        const postData = JSON.parse(data);
        return  `/uploads/${postData.image}`;
    } else {
        return ""
    }
}

export const getImageUrl = (image: string) => {
    console.log("getImageUrl ", image)
    if(image) {
        return  `/uploads/${image}`;
    } else {
        return ""
    }
}