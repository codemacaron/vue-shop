const url = 'http://localhost:8080'
// const url2 = process.env.API_URL
export const api = {
  // auth
  postAuth: url + '/api/auth',
  deleteAuth: url + '/api/auth',
  getAuth: url + '/api/auth/backdoor',
  // auth - google
  getAuthGoogle: url + '/api/auth/google',
  // auth - kakao
  getAuthKakao: url + '/api/auth/kakao',
  // article
  getArticle: url + '/api/article',
  postArticle: url + '/api/article',
  // comment
  getComment: url + '/api/comment',
  postComment: url + '/api/comment',
  // comment - id
  getCommentId: url + '/api/comment/{id}',
  putCommentId: url + '/api/comment/{id}',
  deleteCommentId: url + '/api/comment/{id}',
  // file
  getFile: url + '/api/file',
  postFile: url + '/api/file',
  // file - id
  getFileId: url + '/api/file/{id}',
  deleteFile: url + '/api/file/{id}',
  // menu
  getMenu: url + '/api/menu',
  postMenu: url + '/api/menu',
  // menu - id
  getMenuId: url + '/api/menu/{id}',
  putMenuId: url + '/api/menu/{id}',
  deleteMenuId: url + '/api/menu/{id}',
  // article
  getArticle: url + '/api/article',
  postArticle: url + '/api/article',
  // article - id
  getArticleId: url + '/api/article/{id}',
  putArticleId: url + '/api/article/{id}',
  deleteArticleId: url + '/api/article/{id}',
  // product
  getProduct: url + '/api/product',
  postProduct: url + '/api/product',
  // product - id
  getProductId: url + '/api/product/{id}',
  putProductId: url + '/api/product/{id}',
  deleteProductId: url + '/api/product/{id}',
  // product - prices
  getProductPrices: url + '/api/product/prices',
  // reply
  getReply: url + '/api/reply',
  postReply: url + '/api/reply',
  // reply - id
  getReplyId: url + '/api/reply/{id}',
  putReplyId: url + '/api/reply/{id}',
  deleteReplyId: url + '/api/reply/{id}',
  // status
  getStatus: url + '/api/status',
  // type
  getType: url + '/api/type',
  postType: url + '/api/type',
  // type - id
  getTypeId: url + '/api/type/{id}',
  putTypeId: url + '/api/type/{id}',
  deleteTypeId: url + '/api/type/{id}',
  // User 
  getUser: url + '/api/user',
  postUser: url + '/api/user',
  // User - id
  getUserId: url + '/api/user/{id}',
  putUserId: url + '/api/user/{id}',
  deleteUserId: url + '/api/user/{id}'
}
