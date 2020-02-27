// const { Photo, User, Like, Comment } = require('../models')

// class LikeCommentController {
//     static photoLike(photo_id){
//         Like.findAll({
//             where:{
//                 "photo_id": photo_id
//             }
//         })
//         .then( result => {
//             let numLike = result.length

//         } )
//         .catch( err => {

//         } )
//     }

//     static photoComment(photo_id){
//         Comment.findAll({
//             where:{
//                 "photo_id": photo_id
//             }
//         })
//         .then( result => {

//         } )
//         .catch( err => {

//         } )
//     }
    
// }

// module.exports = LikeCommentController