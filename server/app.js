require('dotenv').config();
const express = require('express');
const aws = require('aws-sdk');
aws.config.region = 'us-east-1';

const app = express();
app.listen(process.env.PORT || 3000);

const S3_BUCKET = process.env.S3_BUCKET;

app.get('/sign-s3', (req, res) => {
	const s3 = new aws.S3();
	const fileName = req.query['file-name'];
	const fileType = req.query['file-type'];
	const s3Params = {
		Bucket: S3_BUCKET,
		Key: fileName,
		Expires: 60,
		ContentType: fileType,
		ACL: 'public-read'
	};

	s3.getSignedUrl('putObject', s3Params, (err, data) => {
		if (err) {
			console.log(err);
			return res.end();
		}
		const returnData = {
			signedRequest: data,
			url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
		};
		res.write(JSON.stringify(returnData));
		res.end();
	});
});
