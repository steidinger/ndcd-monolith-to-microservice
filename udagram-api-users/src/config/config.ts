export const config = {
  'username': process.env.POSTGRES_USERNAME,
  'password': process.env.POSTGRES_PASSWORD,
  'database': process.env.POSTGRES_DB,
  'host': process.env.POSTGRES_HOST,
  'dialect': 'postgres',
  'aws_region': process.env.AWS_REGION,
  'aws_profile': process.env.AWS_PROFILE,
  'aws_media_bucket': process.env.AWS_BUCKET,
  'url': process.env.URL,
  'port': process.env.PORT || 8080,
  'jwt': {
    'secret': process.env.JWT_SECRET,
  },
};

const logConfig = {
  ...config,
  password: (config.password || "").substring(0, 4) + "*****",
  jwt: {
    secret: (config.jwt.secret || "").substring(0, 4) + "*****",
  }
};

console.log('Using config', logConfig);
