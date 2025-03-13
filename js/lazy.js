const images = document.querySelectorAll('img')
images.forEach(image => {
    let src = image.src
    image.src=''
    const observer = new IntersectionObserver((entries,observer)=>{
      entries.forEach((entry)=>{
          entry.target.src = binding.value
          observer.unobserve(entry.target)
      })
    },{threshold:0})
    observer.observe(image)
});
