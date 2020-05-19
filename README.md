# NextJS Blog with Markdown files

## Apex and his Orchestra

The promise of an easy deployment faded while following [this guide](https://medium.com/@romanenko/simple-ci-for-next-js-projects-with-apex-up-github-actions-6f0b1b9a5400)

Should have read [this update](https://aws.amazon.com/blogs/mobile/amplify-framework-announces-new-rearchitected-ui-component-and-modular-javascript-libraries/) first.

Amplify Framework announces new, rearchitected UI Component and modular JavaScript libraries, on 09 APR 2020.  Actually, we don't need Amplify.  It is a wrapper for Cognito Auth funtionality.  That's nice, but a static blog only needs comments, an email list and social network share links.

SO just an S3 bucket should be fine.

[This is worth a shot](https://medium.com/trackstack/deploying-a-react-app-to-aws-s3-with-github-actions-b1cb9ba75c95)

trigger on push to your master branch

The runs-on step outlines the virtual instance running the app and qdd the Node version to run using the strategy and matrix keys.

The workflow is running the actions/checkout Github Action and install, build and test the app before deploying to S3.  We can and should add linting at this stage.

deployment step, which is can be done by using a Github Action called s3-sync-action by Jake Jarvis.

Set the AWS_S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY or AWS_REGION variables in the Settings menu.

## Setting up Apex with Up

[Install up](https://apex.sh/docs/up/setup/) and [set variables with AWS credentials](https://apex.sh/docs/up/credentials/) in our environment.

### Installing Up

Installing up is old school via curl.  I know, but AWS is old school.  You will learn this very quickly working with their Javascript libs.  Anyhow, this is the first command used:

```bash
$ curl -sf https://up.apex.sh/install | sh
'sh' is not recognized as an internal or external command,
operable program or batch file.
```

You get used to people use the latest tools like npm (like for the past ten years) and then you stumble into a walled off old-school territory, and you get [tj's comment on this issue](https://github.com/apex/up/issues/293) saying:

*Hmm I'm not too familiar with the Windows ecosystem, but for the moment you might have better luck downloading a tarball on https://github.com/apex/up/releases for the exe.*

You would think someone at Amazon would know something about windows.  I know this is a full stack app, node/next, and backend is something I tend to avoid these days as I focus purely on front end issues, but c'mon.  Provide an npm dist, please!  Some people might enjoy setting environment variables for things to work, but, it's just so ... old. OK, enough ranting.

Someone there on the issue provides a little more information:

1. From https://github.com/apex/up/releases, for 64-bit Windows, download "up_0.5.0_windows_amd64.tar.gz for 64"
2. Extract the tarball file. Might want to use 7-Zip.
3. Copy up.exe into "c:\Program Files\up"
4. Add "c:\Program Files\up" to your "Path" environment variables.

Had to download 7-Zip.  What an old program.  There's that word, *old* again.  Copied the files, now, tangent done hopefully.  If you don't know how to add environment variables to the PATH on Windows 10, Google is your friend.

I close the terminal, start another one and then try this:

```bash
up
'up' is not recognized as an internal or external command,
operable program or batch file.
```

The file is not in the dll directory C:\Windows\System32\

How does it get there?  I don't care, or want to care, but no I have to care.  Thanks Amazon.  It's late Sunday night and I should be editing a blog post, no researching Windows application setup.

After all that, it appears there is an npm package:

```bash
> npm i -g up
+ up@1.0.2
updated 1 package in 0.231s
```

Have to delete all the ranting!  Darn, love a good rant.  But there are still opportunities.  Despite the above, this still happens:

```bash
> up
'up' is not recognized as an internal or external command,
operable program or batch file.
```

Despite [the article on Medium](https://medium.com/@romanenko/simple-ci-for-next-js-projects-with-apex-up-github-actions-6f0b1b9a5400) being dated Aug 18, 2019, I finally find out the up is no longer maintained.

It says [at the top of the repo](https://github.com/apex/apex) *This software is no longer being maintainted and should not be chosen for new projects, unless your company is interested in sponsoring the project it's unfortunately unsustainable.*

Great.  What is plan B?

### AWS Credentials

To [set variables with AWS credentials](https://apex.sh/docs/up/credentials/) in your environment, you would need some kind of file.

AWS tools support the ~/.aws/credentials

```bash
[myaccount]
aws_access_key_id = xxxxxxxx
aws_secret_access_key = xxxxxxxxxxxxxxxxxxxxxxxx
```

To activate these settings:

```bash
export AWS_PROFILE=myaccount
```

If that seems a little vague, it is.  There is actually a [more detailed page](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) which I'm really eager not to read.  This page looks like all the Amplify documents I had read in the past.  I have an AWS account, but haven't touched it for a year since working with the exciting world of serverless and then having to drop it all for a new role that involved Ionic and Electron.  Yes, as a contractor, unfortunately my learning is often work related.

There is a aws configure command which should allow you to interactively configure these things:
```bash
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-west-2
Default output format [None]: json
```

This may not all be needed if the GitHub hook works well.  The ideal is to edit a markdown file on GitHub itself, commit the changes and have an action build and deploy it.  No CLI work needed.  We'll see how that goes.

The second link says: *The AWS Access Key ID and AWS Secret Access Key are your AWS credentials. They are associated with an AWS Identity and Access Management (IAM) user or role that determines what permissions you have. For a tutorial on how to create a user with the IAM service, see [Creating Your First IAM Admin User and Group](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html) in the IAM User Guide.*

Great, yet another boring page to read.  Luckily I keep good notes, so I can see from a year and two laptops ago, that I had used this method:

```bash
export AWS_ACCESS_KEY_ID=xxxxxxxxxxxxxxxxxx
export AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
# AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are now available for serverless to use
serverless deploy
```

That was on a mac however.  I think windows needs a slightly different format?

Windows Command Prompt version:

```bash
C:\> setx AWS_ACCESS_KEY_ID xxxxxxxxxxxxxxxxxx
C:\> setx AWS_SECRET_ACCESS_KEY export AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
C:\> setx AWS_DEFAULT_REGION us-west-2
```

Only the AWS stuff might be useful, if it'a still relevant.  It [may not be](https://aws.amazon.com/blogs/mobile/amplify-framework-announces-new-rearchitected-ui-component-and-modular-javascript-libraries/).

## Original Readme

Boilerplate used for the blog post published [here](https://telmo.online/nextjs-blog-in-less-than-1-hour) by [Telmo](https://twitter.com/telmo)

---

Run:

```
npm install
```

```
npm run dev
```

[Next.js][https://nextjs.org/].

If you access http://localhost:3000/post/hello-world we'll want to load a file called hello-world.md


[react-markdown](https://github.com/rexxars/react-markdown) to handle markdown formatting.
[gray-matter](https://www.npmjs.com/package/gray-matter) to parse our file frontmatter data.
raw-loader  add some NextJS configuration to tell it to load .md files
react react-dom next
