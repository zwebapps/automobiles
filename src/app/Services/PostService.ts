export const fetPostByName = async (name: string) => {
    fetch(`/api/post/${name}`, {
        method: "GET",
    }).then((res) => {
        console.log('res', res)
        return res.json();
    })
}