export  const getImage = (data: string) => {
    if(data) {
        const postData = JSON.parse(data);
        return postData.image? `/${postData.image}` : '/bashboard.png';
    } else {
        return ""
    }
}

export const getImageUrl = (image: string) => {
    if(image) {
        return  `/${image}`;
    } else {
        return ""
    }
}