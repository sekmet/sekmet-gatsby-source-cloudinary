"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = async ({
  node,
  actions,
  createNodeId,
  createContentDigest,
  store,
  cache
}) => {
  const {
    createNode,
    createNodeField,
    createParentChildLink
  } = actions;

  if (node.internal.type === `CloudinaryMedia`) {} //console.log(node)
  //console.log('NODE == ', node)

  /*
  let remoteFile
  try {
  remoteFile = await Promise.resolve(createRemoteFileNode({
      url: node.url,
      store,
      cache,
      createNode,
      createNodeId
  }).then((result) => {
       const cloudinaryFileNode = {
          id: createNodeId(`${node.id} >>> CloudiaryMediaFile`),
          children: [],
          parent: node.id,
          internal: {
              contentDigest: createContentDigest(result),
              type: `CloudiaryMediaFile`,
          }
       }
       createNode(cloudinaryFileNode)
      createParentChildLink({ parent: node, child: cloudinaryFileNode })
       return result
   }))
   } catch (e) {
      // Ignore
      console.log(e)
  }
   */

};

exports.default = _default;