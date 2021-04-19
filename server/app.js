require('dotenv').config();
const express = require('express');
const aws = require('aws-sdk');
const cors = require('cors');

aws.config.region = 'us-east-1';
const app = express();
app.use(cors());

app.listen(process.env.PORT || 3001);

const S3_BUCKET = process.env.S3_BUCKET_NAME;


app.get('/sign-s3', (req, res) => {
	// Needed the signature version param to work
	const s3 = new aws.S3({ region: 'us-east-1', signatureVersion: 'v4' });
	const fileName = req.query['file-name'];
	const fileType = encodeURIComponent(req.query['file-type']);
	const username = encodeURIComponent(req.query['username']);

	const constructedFileName = `${username}_${fileName}`;
	const s3Params = {
		Bucket: S3_BUCKET,
		Key: constructedFileName,
		Expires: 60,
		ContentType: fileType,
		ACL: 'public-read'
	};

	s3.getSignedUrl('putObject', s3Params, (err, data) => {
		if (err) {
			console.error(err);
			return res.end();
		}
		const returnData = {
			signedRequest: data,
			// automatic url, should append docId or user to ensure nothing
			// is overwritten
			url: `https://${S3_BUCKET}.s3.amazonaws.com/${constructedFileName}`
		};
		res.write(JSON.stringify(returnData));
		res.end();
	});
});
