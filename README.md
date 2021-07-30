# Alien Blog UI 

This app requires API server to be started to communicate with, that is https://github.com/azamuddin/aliens-blog-server (API server)

## Start 

```
npm run dev
```

Will run on default port 3000. To change PORT, add PORT env variable like this:

```
PORT=3001 npm run dev
```

## Configuration 

The API to communicate with is configure in `.env`, variable `NEXT_PUBLIC_API`. 

Make sure the variable points to the API server.


