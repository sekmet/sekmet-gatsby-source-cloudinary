# @sekmet/gatsby-source-cloudinary

## About this plugin

Source plugin for pulling assets into Gatsby from Cloudinary. 
It creates links between entry types and asset so they can be queried in Gatsby using GraphQL and creates ImageSharp nodes from your cloudinary image files that are supported by the Sharp image processing library and provides fields in their GraphQL types for processing your images in a variety of ways including resizing, cropping, and creating responsive images.

**Only images supported currently**

## Install:

```bash
npm install --save @sekmet/gatsby-source-cloudinary
```

OR

```bash
yarn add @sekmet/gatsby-source-cloudinary
```


## How to use

First, you need a way to pass environment variables to the build process, so secrets and other secured data aren’t committed to source control. 
We recommend using ``dotenv`` which will then expose environment variables. [Read more about dotenv and using environment variables here](https://gatsby.dev/env-vars). 

Then we can use these environment variables and configure our plugin.


### This plugin is still in development!.

In your `gatsby-config.js` file, include the plugin like this:

```js
{
    resolve:`@sekmet/gatsby-source-cloudinary`,
    options:{
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    resourceType: `image`,
    type: `upload`,
    maxResults: `10`,
    tags: yes,
    prefix: `my-base-directory/`
    }
}
```

`cloudName`, `apiKey` and `apiSecret` are compulsory fields whereas the rest are optional query parameters to be included.

Here are details of each query parameter as culled from cloudinary.com.

* `resourceType` - Optional (String, default: image). The type of file. Possible values: image, raw, video. Relevant as a parameter only when using the SDKs (the resource type is included in the endpoint URL for direct calls to the HTTP API). Note: Use the video resource type for all video resources as well as for audio files, such as .mp3. *soon - only images supported currently*
* `type` - Optional (String, default: all). The storage type: upload, private, authenticated, facebook, twitter, gplus, instagram_name, gravatar, youtube, hulu, vimeo, animoto, worldstarhiphop or dailymotion. Relevant as a parameter only when using the SDKs (the type is included in the endpoint URL for direct calls to the HTTP API).
* `maxResults` - Optional. (Integer, default=10. maximum=500). Max number of resources to return.
* `tags` - Optional (Boolean, default: false). If true, include the list of tag names assigned each resource.
* `prefix` - Optional. (String). Find all resources with a public ID that starts with the given prefix. The resources are sorted by public ID in the response.

> With `prefix`, you can source only media files from a specific folder. However, you will need to specify `type` and `resourceType` in the config options.

An example `prefix` value is `gatsby-anime-videos/`. This will fetch only media files with public ids beginning with `gatsby-anime-videos/*`. Example: `gatsby-anime-videos/naruto.mp4`

Obtain your cloudname, key and secret from your cloudinary console when you signup at [Cloudinary.com](https://cloudinary.com)

Feel free to create feature requests.... and PRs :)
