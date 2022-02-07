const cloudinary = require('cloudinary').v2
const deleteFile = (imageUrl) => {
    const imageSplited = imageUrl.split('/')
    const nameSplited = imageSplited[imageSplited.length - 1].split('.')
    const folderSplited = imageSplited[imageSplited.length - 2]
    const public_id = `${folderSplited}/${nameSplited[0]}`;
    cloudinary.uploader.destroy(public_id, () => {
        console.log('Image delete in cloudinary')
    })
}
module.exports = { deleteFile }