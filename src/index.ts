import server from './config/server';

server.listen(process.env.PORT || 3000, () => {
    console.log('Server running');
});