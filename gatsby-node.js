"use strict";

var _onNodeCreate = _interopRequireDefault(require("./on-node-create"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import extendNodeType from './extend-node-type'
//import onSourceNodes from './on-source-nodes'
//import Fluid from './Fluid'
const cloudinary = require('cloudinary');

const {
  createRemoteFileNode
} = require(`gatsby-source-filesystem`);
/*
exports.setFieldsOnGraphQLNodeType = (
    { type, pathPrefix, getNodeAndSavePathDependency, reporter, cache, ...otherProps },
    { cloudName, apiKey, apiSecret },
) => {
    if (type.name !== `CloudinaryMedia`) {
        return {}
    }

    const cloudinaryConfig = {
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
    }

    const nodeOptions = {
        pathPrefix,
        getNodeAndSavePathDependency,
        reporter,
        cache,
        cloudinaryConfig,
    }

    //console.log(nodeOptions)

    return {
        fluid: Fluid(nodeOptions),
    }
}
*/


exports.onCreateNode = _onNodeCreate.default;
const extensions = [`jpeg`, `jpg`, `png`, `webp`
/*`tif`,
`tiff`,
`gif`,
`mp4`,
`webm`,
`ogv`,*/
].reduce((acc, v) => {
  acc[v] = v;
  return acc;
}, {});

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
  store,
  cache,
  reporter
}, configOptions) => {
  const {
    createTypes,
    createNode,
    createNodeField,
    createParentChildLink
  } = actions;

  if (createTypes) {
    createTypes(`
          type CloudinaryMedia implements Node {
            url: String
            secure_url: String 
            resource_type: String        
            height: String 
            width: String 
            public_id: String 
            format: String
            tags: [String!]
            context: MediaContext
          }
          
          type MediaContext {
            path: String
          }
          
    `); //console.log('type created')
  }
  /*
  const processMedia = async (media) => {
      //const nodeId = createNodeId(`cloudinary-media-${media.public_id}`)
      //const nodeContent = JSON.stringify(media)
        /*const nodeData = Object.assign({}, media, {
          id: nodeId,
          parent: null,
          children: [],
          internal: {
              type: `CloudinaryMedia`,
              content: nodeContent,
              contentDigest: createContentDigest(media),
          },
      })* /
       ////###################################################33
      if (!extensions[media.format]) {
          return
      }
       let fileNode;
       try {
          fileNode = await createRemoteFileNode({
              url: media.url,
              store,
              cache,
              createNode,
              createNodeId: (id) => `cloudinary-media-${id}`,
          })
           /*await createNodeField({
              node: fileNode,
              name: 'CloudiaryMedia',
              value: 'true',
          })
            await createNodeField({
              node: fileNode,
              name: 'created_at',
              value: media.created_at,
          })* /
       } catch (error) {
          console.warn('error creating node', error)
      }
        return fileNode
  }
  */


  const extensions = [`jpeg`, `jpg`, `png`, `webp`, `tif`, `tiff` //`gif`,
  //`mp4`,
  //`webm`,
  //`ogv`,
  ].reduce((acc, v) => {
    acc[v] = v;
    return acc;
  }, {});
  delete configOptions.plugins; // Configure Cloudinary

  cloudinary.config({
    cloud_name: configOptions.cloudName,
    api_key: configOptions.apiKey,
    api_secret: configOptions.apiSecret
  });
  const {
    resourceType,
    prefix,
    tags,
    maxResults,
    type
  } = configOptions;
  const queryParams = new Object();

  if (!!resourceType) {
    queryParams.resource_type = resourceType;
  }

  if (!!tags) {
    queryParams.tags = tags;
  }

  if (!!maxResults) {
    queryParams.max_results = maxResults;
  }

  if (!!type) {
    queryParams.type = type;
  }

  if (!!prefix && !!type) {
    queryParams.prefix = prefix;
  }

  const result = await cloudinary.v2.api.resources(queryParams);

  if (result.resources.length > 0) {
    reporter.info(`Creating Cloudinary file nodes`); //for (const media of result.resources) {

    result.resources.forEach(async media => {
      try {
        if (!extensions[media.format]) {
          return;
        } //console.log(media)


        const nodeId = createNodeId(`cloudinary-media-${media.public_id}`);
        const nodeContent = JSON.stringify(media);
        const imageNode = await createRemoteFileNode({
          url: media.url,
          cache,
          store,
          createNode,
          createNodeId
        });
        let node = Object.assign({}, {
          id: nodeId,
          parent: imageNode.id,
          children: [],
          internal: {
            type: `CloudinaryMedia`,
            content: nodeContent,
            contentDigest: createContentDigest(media)
          }
        }, media); //node[`image___NODE`] = node.id

        createNode(node);
        createParentChildLink({
          parent: node,
          child: imageNode
        }); //console.log(imageNode.id)
      } catch (error) {
        console.warn('error creating node', error);
      }
    });
  }
  /*await cloudinary.v2.api.resources(queryParams, async (error, result) => {
      if(result.resources.length > 0){
          reporter.info(`Creating Cloudinary file nodes`)
           await result.resources.map(async mediaItem => {
              //for (const mediaItem of result.resources) {
              const nodeData = await processMedia(mediaItem)
              if (nodeData) {
                  console.log(nodeData.id)
              }
          }
      )
           reporter.success(`Created Cloudinary file nodes!`)
       }else{
          console.log('\n ~Yikes! No Cloudinary files found and nodes not created. Try a better query.')
       }
       if (error){console.log(error)}
    })*/

};