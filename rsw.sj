<script>
  if ('serviceWorker' in navigator) {
    // O escopo garante que o SW não toque na index.html da raiz
    navigator.serviceWorker.register('/templates/sw.js', { scope: '/templates/' })
      .then(reg => console.log('PWA ativo apenas em /templates/'))
      .catch(err => console.error('Erro de registro:', err));
  }
</script>
