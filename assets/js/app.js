// CÓDIGO SENCILLO QUE CARGA data/content.json Y RENDERIZA LAS DIAPOS
(async function(){
    const slidesContainer = document.getElementById('slides');
    const notesEl = document.getElementById('notes');
    const indicator = document.getElementById('indicator');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const toggleNotesBtn = document.getElementById('toggle-notes');


    let data = { slides: [] };
    try{
        const res = await fetch('data/content.json');
        data = await res.json();
    }catch(e){
        slidesContainer.innerHTML = '<div class="slide">NO SE PUDO CARGAR content.json</div>';
        console.error(e);
    }

    let index = 0;
    function render(){
    slidesContainer.innerHTML = '';
    const slide = data.slides[index];
    indicator.textContent = `${index+1} / ${data.slides.length}`;

    const node = document.createElement('article');
    node.className = 'slide';
    node.innerHTML = `
        <h2>${slide.title || ''}</h2>
        <h3>${slide.subtitle || ''}</h3>
        ${slide.image?`<img src="${slide.image}" alt="" style="max-width:100%;height:auto;border-radius:.5rem;margin:.5rem 0">`:''}
        <div class="slide-content">${(slide.content||[]).map(p=>`<p>${p}</p>`).join('')}</div>
    `;


        slidesContainer.appendChild(node);
        notesEl.textContent = slide.notes || '';
    }

    prevBtn.addEventListener('click',()=>{ if(index>0){ index--; render(); } });
    nextBtn.addEventListener('click',()=>{ if(index < data.slides.length-1){ index++; render(); } });
    toggleNotesBtn.addEventListener('click',()=>{ notesEl.classList.toggle('hidden'); });


    if(data.slides.length) render();
})();