self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});


self.addEventListener('message', event => {
  const data = event.data || {};
  if(data && data.type === 'SHOW_NOTIFICATION'){
    const title = data.title || 'Visite nosso Repositório';
    const options = data.options || {
      body: 'Acesse nosso repertório — clique para abrir.',
      tag: 'edcell-daily',
      data: { url: data.url || '/' },
    };
    self.registration.showNotification(title, options);
  }
});


self.addEventListener('notificationclick', function(event){
  event.notification.close();
  const url = (event.notification && event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then( clientsArr => {
   
      for(let i=0;i<clientsArr.length;i++){
        const client = clientsArr[i];
      
        if(client.url === url && 'focus' in client) return client.focus();
      }
    
      if(self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});
