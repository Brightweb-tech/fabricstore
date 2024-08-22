window.Webflow ||= [];
window.Webflow.push(() => {
  const selectors = {
    tecido: document.getElementById('tecido-selector'),
    tipo: document.getElementById('tipo-selector'),
    medidas: document.getElementById('medidas-selector'),
    correcao: document.getElementById('correcao-selector'),
    calha: document.getElementById('calha-selector'),
    instalacao: document.getElementById('instalacao-selector'),
  };
  const larguraInput = document.getElementById('largura-input');
  const alturaInput = document.getElementById('altura-input');
  const nomeInput = document.getElementById('nome-input');
  const emailInput = document.getElementById('email-input');
  const contactoSwitch = document.getElementById('contacto-switch');
  const nextButton = document.getElementById('seguinte-btn');

  const simContainer = document.getElementById('sim-container');
  const checkoutContain = document.getElementById('checkout-container');

  const windows = [];

  const steps = {
    tecido: document.getElementById('step-tecido'),
    tipo: document.getElementById('step-tipo'),
    medidas: document.getElementById('step-medidas'),
    calha: document.getElementById('step-calha'),
    instalacao: document.getElementById('step-instalacao'),
  };

  const checkoutChoices = {
    tecido: document.getElementById('checkout-tecido'),
    tipo: document.getElementById('checkout-tipo'),
    largura: document.getElementById('checkout-largura'),
    altura: document.getElementById('checkout-altura'),
    correcao: document.getElementById('checkout-correcao'),
    calha: document.getElementById('checkout-calha'),
    instalacao: document.getElementById('checkout-instalacao'),
  };

  const newWindowContain = document.getElementById('new-window-contain');
  const checkoutFormContain = document.getElementById('checkout-input-contain');
  const newWindowButton = document.getElementById('new-window-btn');
  const noWindowButton = document.getElementById('no-window-btn');
  const enviarButton = document.getElementById('enviar-btn');

  let currentStep = 'tecido';

  const selectorValues = {
    tecido: '',
    tipo: '',
    medidas: '',
    correcao: '',
    calha: '',
    instalacao: '',
    nome: '',
    email: '',
    contacto: '',
  };

  const changeSelectorVisibility = (selector, visible) => {
    selector.style.display = visible ? 'flex' : 'none';
  };

  const updateSelectorValue = (selector, value) => {
    selectorValues[selector.id.split('-')[0]] = value;
  };

  const resetValues = () => {
    selectorValues.tecido = '';
    selectorValues.tipo = '';
    selectorValues.medidas = '';
    selectorValues.correcao = '';
    selectorValues.calha = '';
    selectorValues.instalacao = '';
  };

  const validateSelector = (selector) => {
    if (selectorValues[selector] === '') {
      alert('Por favor selecione um valor');
      return false;
    }
    return true;
  };

  const markStepAsCompleted = (step) => {
    steps[step].classList.remove('active');
    steps[step].classList.remove('next');
    steps[step].classList.add('done');
    steps[step].getElementsByClassName('step_number')[0].classList.remove('active');
    steps[step].getElementsByClassName('step_description')[0].textContent = selectorValues[step];
    if (step === 'medidas')
      steps[step].getElementsByClassName('step_description')[0].textContent +=
        selectorValues.correcao ? 'c/Verificação' : 's/Verificação';
  };
  const markStepAsActive = (step) => {
    steps[step].classList.remove('next');
    steps[step].classList.add('active');
    steps[step].getElementsByClassName('step_number')[0].classList.add('active');
  };
  const markStepAsNext = (step) => {
    steps[step].classList.add('next');
  };

  const advanceStep = () => {
    switch (currentStep) {
      case 'tecido':
        if (validateSelector('tecido')) {
          markStepAsCompleted('tecido');
          markStepAsActive('tipo');
          changeSelectorVisibility(selectors.tecido, false);
          changeSelectorVisibility(selectors.tipo, true);
          currentStep = 'tipo';
        }
        break;
      case 'tipo':
        if (validateSelector('tipo')) {
          markStepAsCompleted('tipo');
          markStepAsActive('medidas');
          changeSelectorVisibility(selectors.tipo, false);
          changeSelectorVisibility(selectors.medidas, true);
          currentStep = 'medidas';
        }
        break;
      case 'medidas':
        if (larguraInput.value === '' || alturaInput.value === '') {
          alert('Por favor preencha todos os campos');
          return;
        }
        updateSelectorValue(selectors.medidas, `${larguraInput.value} X ${alturaInput.value}`);
        if (validateSelector('medidas')) {
          changeSelectorVisibility(selectors.medidas, false);
          changeSelectorVisibility(selectors.correcao, true);
          currentStep = 'correcao';
        }
        break;
      case 'correcao':
        markStepAsCompleted('medidas');
        markStepAsActive('calha');
        changeSelectorVisibility(selectors.correcao, false);
        changeSelectorVisibility(selectors.calha, true);
        currentStep = 'calha';
        break;
      case 'calha':
        if (validateSelector('calha')) {
          markStepAsCompleted('calha');
          markStepAsActive('instalacao');
          changeSelectorVisibility(selectors.calha, false);
          changeSelectorVisibility(selectors.instalacao, true);
          currentStep = 'instalacao';
        }
        break;
      case 'instalacao':
        populateCheckoutChoices();
        markStepAsCompleted('instalacao');
        changeSelectorVisibility(selectors.instalacao, false);
        navigateToCheckout();
        break;
    }
  };

  const navigateToCheckout = () => {
    simContainer.style.display = 'none';
    checkoutContain.style.display = 'flex';
  };

  const navigateFromCheckoutToStep = (step) => {
    checkoutContain.style.display = 'none';
    simContainer.style.display = 'flex';
    if (step === 'largura' || step === 'altura') {
      step = 'medidas';
    }
    changeSelectorVisibility(selectors[step], true);
    currentStep = step;
    markStepAsActive(step);
  };

  const addOnClickToTecidoCards = () => {
    const cards = document.querySelectorAll("[id^='tecido-card']");
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        updateSelectorValue(selectors.tecido, card.getElementsByTagName('h1')[0].textContent);
      });
    });
  };

  const addOnClickToCalhaCards = () => {
    const cards = document.querySelectorAll("[id^='calha-card']");
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        updateSelectorValue(selectors.calha, card.getElementsByTagName('h1')[0].textContent);
      });
    });
  };
  const addOnClickToTipoCards = () => {
    const cards = document.querySelectorAll("[id^='tipo-card']");
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        updateSelectorValue(selectors.tipo, card.getElementsByTagName('h1')[0].textContent);
      });
    });
  };

  const correcaoInput = document.querySelector('#correcao-switch');
  correcaoInput.addEventListener('change', function (event) {
    updateSelectorValue(selectors.correcao, correcaoInput.checked);
  });

  const instalacaoInput = document.querySelector('#instalacao-switch');
  instalacaoInput.addEventListener('change', function (event) {
    updateSelectorValue(selectors.instalacao, instalacaoInput.checked);
  });

  const addOnClickColor = () => {
    document.querySelectorAll('.tecido_color').forEach((color) => {
      color.addEventListener('click', (event) => {
        // get selected color
        const selectedDiv = event.currentTarget;
        const selectedColor = selectedDiv.id;

        // get thumbnail image div to replace image for the selected color
        const cardThumbnailImage =
          selectedDiv.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
            'tecido_image'
          )[0];

        // get corresponding image from colors hidden cms
        const colorsThumbnailImages = document.querySelectorAll("[id^='color-thumbnail-image']");

        for (let i = 0; i < colorsThumbnailImages.length; i++) {
          if (colorsThumbnailImages[i].textContent === selectedColor) {
            cardThumbnailImage.setAttribute(
              'src',
              colorsThumbnailImages[i].style.backgroundImage.split('"')[1]
            );
            cardThumbnailImage.setAttribute('srcset', '');
            break;
          }
        }
      });
    });
  };

  const populateCheckoutChoices = () => {
    checkoutChoices.tecido.textContent = selectorValues.tecido;
    checkoutChoices.tipo.textContent = selectorValues.tipo;
    checkoutChoices.largura.textContent = selectorValues.medidas.split(' X ')[0] + 'cm Largura';
    checkoutChoices.altura.textContent = selectorValues.medidas.split(' X ')[1] + 'cm Altura';
    checkoutChoices.correcao.textContent = selectorValues.correcao
      ? 'Com Verificação'
      : 'Sem Verificação';
    checkoutChoices.calha.textContent = selectorValues.calha;
    checkoutChoices.instalacao.textContent = selectorValues.instalacao
      ? 'Com Instalação'
      : 'Sem Instalação';
  };

  const addOnClickCheckoutChoices = () => {
    Object.keys(checkoutChoices).forEach((key) => {
      checkoutChoices[key].addEventListener('click', () => {
        navigateFromCheckoutToStep(key);
      });
    });
  };

  const addOnClickEnviar = () => {
    enviarButton.addEventListener('click', () => {
      selectorValues.nome = nomeInput.value;
      selectorValues.email = emailInput.value;
      selectorValues.contacto = contactoSwitch.checked;
      generateAndDownloadPdf();
    });
  };

  const addOnClickNewWindow = () => {
    newWindowButton.addEventListener('click', createWindow);
  };

  const addOnClickNoWindow = () => {
    noWindowButton.addEventListener('click', () => {
      resetValues();
      newWindowContain.style.display = 'none';
      checkoutFormContain.style.display = 'flex';
    });
  };
  const storeValues = () => {
    const newWindow = {
      tecido: selectorValues.tecido,
      tipo: selectorValues.tipo,
      medidas: selectorValues.medidas,
      correcao: selectorValues.correcao,
      calha: selectorValues.calha,
      instalacao: selectorValues.instalacao,
    };
    windows.push(newWindow);
  };

  const createWindow = () => {
    storeValues();
    resetValues();
    navigateFromCheckoutToStep('tecido');
  };

  const generateAndDownloadPdf = () => {
    // const { jsPDF } = window.jspdf;
    // const doc = new jsPDF();
    // const x = 10; // X-coordinate for text
    // let y = 10; // Y-coordinate for text
    // const lineHeight = 10; // Space between lines
    // const correcao = selectorValues.correcao ? 'Sim' : 'Não',
    //   instalacao = selectorValues.instalacao ? 'Sim' : 'Não',
    //   contacto = selectorValues.contacto ? 'Sim' : 'Não';
    // doc.setFontSize(12);
    // doc.text(`Tecido: ${selectorValues.tecido}`, x, y);
    // y += lineHeight;
    // doc.text(`Tipo: ${selectorValues.tipo}`, x, y);
    // y += lineHeight;
    // doc.text(`Medidas: ${selectorValues.medidas}`, x, y);
    // y += lineHeight;
    // doc.text(`Com Verificação: ${correcao}`, x, y);
    // y += lineHeight;
    // doc.text(`Calha: ${selectorValues.calha}`, x, y);
    // y += lineHeight;
    // doc.text(`Com Instalação: ${instalacao}`, x, y);
    // y += lineHeight;
    // doc.text(`Nome: ${selectorValues.nome}`, x, y);
    // y += lineHeight;
    // doc.text(`Email: ${selectorValues.email}`, x, y);
    // y += lineHeight;
    // doc.text(`Aceita ser contactado: ${contacto}`, x, y);
    // // Save the PDF and trigger the download
    // doc.save('generated.pdf');
  };

  nextButton.addEventListener('click', advanceStep);

  addOnClickToTecidoCards();
  addOnClickToCalhaCards();
  addOnClickToTipoCards();
  addOnClickColor();
  addOnClickEnviar();
  addOnClickNewWindow();
  addOnClickNoWindow();
  addOnClickCheckoutChoices();
});
