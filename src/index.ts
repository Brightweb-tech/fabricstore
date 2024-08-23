window.Webflow ||= [];
window.Webflow.push(() => {
  const calhaSizes = {
    5000: {
      branco: {
        1.2: 30,
        1.4: 35,
        1.6: 40,
        1.8: 45,
        2: 50,
        2.2: 55,
        2.4: 60,
        2.6: 65,
        3: 70,
        3.2: 75,
        3.4: 80,
        3.6: 85,
        4: 90,
        4.4: 95,
        5: 100,
        6: 110,
      },
      inox: {
        1.2: 35,
        1.4: 40,
        1.6: 45,
        1.8: 50,
        2: 55,
        2.2: 60,
        2.4: 65,
        2.6: 70,
        3: 75,
        3.2: 80,
        3.4: 85,
        3.6: 90,
        4: 95,
        4.4: 100,
        5: 105,
        6: 115,
      },
    },
  };
  const selectors = {
    inicio: document.getElementById('inicio-selector'),
    // Selectors
    tecido: document.getElementById('tecido-selector'),
    tipo: document.getElementById('tipo-selector'),
    bainha: document.getElementById('bainha-selector'),
    medidas: document.getElementById('medidas-selector'),
    correcao: document.getElementById('correcao-selector'),
    calha: document.getElementById('calha-selector'),
    instalacao: document.getElementById('instalacao-selector'),
  };
  // Inputs
  const larguraInput = document.getElementById('largura-input');
  const alturaInput = document.getElementById('altura-input');
  const nomeInput = document.getElementById('nome-input');
  const emailInput = document.getElementById('email-input');
  const contactoSwitch = document.getElementById('contacto-switch');

  // Flow elements
  const nextButton = document.getElementById('seguinte-btn');
  const simContainer = document.getElementById('sim-container');

  // Checkout elements
  const checkoutContain = document.getElementById('checkout-container');
  const newWindowContain = document.getElementById('new-window-contain');
  const checkoutFormContain = document.getElementById('checkout-input-contain');
  const newWindowButton = document.getElementById('new-window-btn');
  const noWindowButton = document.getElementById('no-window-btn');
  const enviarButton = document.getElementById('enviar-btn');

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

  let currentStep = 'inicio';

  const selectorValues = {
    inicio: '',
    tecido: '',
    tipo: '',
    bainha: '',
    medidas: '',
    correcao: '',
    calha: '',
    instalacao: '',
    nome: '',
    email: '',
    contacto: '',
  };

  const calculateTotalWidth = (width, tipo) => {
    switch (tipo) {
      case 'Franzido':
        return (width * 2.5) / 100;
      case 'Ondas':
        return (width * 2.7) / 100;
      case 'Macho Juntos':
        return (width * 3) / 100;
      case 'Pregas':
        return (width * 2.5) / 100;
    }
  };

  const calculateMaterialPrice = (pricePerMeter, width) => {
    return pricePerMeter * width;
  };

  const calculateManufacturingPrice = (tipo, tecido, width, pricePerMeter) => {
    switch (tipo) {
      case 'Franzido':
        if (tecido === 'Blackout') return width * 9;
        return width * 8;
      case 'Ondas':
        if (tecido === 'Blackout') return width * 8.5;
        return width * 7.5;
      case 'Macho Juntos':
        return width * 13.5;
      case 'Pregas':
        return width * 13.5;
    }
  };

  const calculateMeasuresCheckPrice = (instalacao) => {
    return instalacao ? 0 : 30;
  };

  const calculateInstallationPrice = (instalacao, medidas) => {
    if (!instalacao) return 0;
    const largura = medidas.split(' X ')[0];
    if (largura < 300) {
      return 30;
    }
    if (largura < 400) {
      return 40;
    }
    if (largura < 500) {
      return 45;
    }
    if (largura < 600) {
      return 50;
    }
  };

  const calculateCalhaPrice = (calha, medidas) => {
    const largura = medidas.split(' X ')[0] / 100;
    // const calhaModel = calha.split(' - ')[0];
    // const calhaColor = calha.split(' - ')[1];

    let selectedCalhaPrice = null;

    const sortedCalhaSizes = Object.keys(calhaSizes[5000].branco).sort((a, b) => a - b);

    for (let i = 0; i < sortedCalhaSizes.length; i++) {
      if (largura < sortedCalhaSizes[i]) {
        selectedCalhaPrice = calhaSizes[5000].branco[sortedCalhaSizes[i]];
        break;
      }
    }
    return selectedCalhaPrice;
    // Object.keys(calhaSizes[5000].branco)
    //   .sort((a, b) => a - b)
    //   .forEach((size) => {
    //     if (largura < size) {
    //       return calhaSizes[5000].branco[size];
    //     }
    //   });
  };

  const calculateWindowPrice = (window) => {
    const totalWidth = calculateTotalWidth(window.medidas.split(' X ')[0], window.tipo);
    const materialPrice = calculateMaterialPrice(10, totalWidth);
    const manufacturingPrice = calculateManufacturingPrice(
      window.tipo,
      window.tecido,
      totalWidth,
      10
    );
    const measuresCheckPrice = calculateMeasuresCheckPrice(window.correcao) || 0;
    const installationPrice = calculateInstallationPrice(window.instalacao, window.medidas) || 0;
    const calhaPrice = calculateCalhaPrice(window.calha, window.medidas) || 0;
    const result =
      materialPrice + manufacturingPrice + measuresCheckPrice + installationPrice + calhaPrice;
    return result;
  };

  const calculateCheckoutPrice = (windows) => {
    let total = 0;
    windows.forEach((window) => {
      total += calculateWindowPrice(window);
    });
    return total;
  };

  const changeSelectorVisibility = (selector, visible) => {
    selector.style.display = visible ? 'flex' : 'none';
  };

  const updateSelectorValue = (selector, value) => {
    selectorValues[selector.id.split('-')[0]] = value;
  };

  const resetValues = () => {
    selectorValues.inicio = '';
    selectorValues.tecido = '';
    selectorValues.tipo = '';
    selectorValues.bainha = '';
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
    // eslint-disable-next-line prettier/prettier
    if (step === 'medidas')
      steps[step].getElementsByClassName('step_description')[0].textContent +=
        selectorValues.correcao ? 'c/Verificação' : 's/Verificação';
    // eslint-disable-next-line prettier/prettier
    if (step === 'tipo')
      steps[step].getElementsByClassName('step_description')[0].textContent += selectorValues.bainha
        ? 'c/Baínha de Chumbo'
        : 's/Baínha de Chumbo';
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
      case 'inicio':
        if (validateSelector('inicio')) {
          changeSelectorVisibility(selectors.inicio, false);
          changeSelectorVisibility(selectors.tecido, true);
          currentStep = 'tecido';
        }
        break;
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
          changeSelectorVisibility(selectors.tipo, false);
          changeSelectorVisibility(selectors.bainha, true);
          currentStep = 'bainha';
        }
        break;
      case 'bainha':
        updateSelectorValue(selectors.bainha, `${larguraInput.value} X ${alturaInput.value}`);
        if (validateSelector('bainha')) {
          markStepAsCompleted('tipo');
          markStepAsActive('medidas');
          changeSelectorVisibility(selectors.bainha, false);
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

  const addOnClickToInicioCards = () => {
    const cards = document.querySelectorAll("[id^='inicio-card']");
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        updateSelectorValue(selectors.inicio, card.getElementsByTagName('h1')[0].textContent);
      });
    });
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
      // storeValues();
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
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const x = 10; // X-coordinate for text
    let y = 10; // Y-coordinate for text
    const lineHeight = 10; // Space between lines
    const totals = [];
    let total = 0;
    windows.forEach((window, index) => {
      if (index % 3 === 0 && index !== 0) {
        doc.addPage();
        y = 10;
      }
      totals.push(calculateWindowPrice(window));
      total += totals[index];
      doc.setFontSize(12);
      doc.text(`Janela ${index + 1}`, x, y);
      doc.setFontSize(8);
      y += lineHeight;
      const correcao = window.correcao ? 'Sim' : 'Não',
        instalacao = window.instalacao ? 'Sim' : 'Não';
      doc.text(`Tecido: ${window.tecido}`, x, y);
      y += lineHeight;
      doc.text(`Tipo: ${window.tipo}`, x, y);
      y += lineHeight;
      doc.text(`Medidas: ${window.medidas}`, x, y);
      y += lineHeight;
      doc.text(`Com Verificação: ${correcao}`, x, y);
      y += lineHeight;
      doc.text(`Calha: ${window.calha}`, x, y);
      y += lineHeight;
      doc.text(`Com Instalação: ${instalacao}`, x, y);
      y += lineHeight;
      doc.text('---------------------', x, y);
      y += lineHeight;
      doc.setFontSize(16);
      doc.text(`Preço: ${totals[index]}`, x, y);
      y += lineHeight;
      y += lineHeight;
    });

    doc.addPage();
    y = 10;
    doc.setFontSize(12);
    doc.text('Resumo', x, y);
    doc.setFontSize(8);
    y += lineHeight;
    windows.forEach((window, index) => {
      doc.text(`Janela ${index + 1}: ${totals[index]}`, x, y);
      y += lineHeight;
    });
    y += lineHeight;
    doc.text(`Total: ${total}`, x, y);
    y += lineHeight;
    doc.setFontSize(12);
    doc.text(`Nome: ${selectorValues.nome}`, x, y);
    y += lineHeight;
    doc.text(`Email: ${selectorValues.email}`, x, y);
    y += lineHeight;
    // doc.text(`Aceita ser contactado: ${contacto}`, x, y);
    // Save the PDF and trigger the download
    doc.save('generated.pdf');
    getCalhas();
  };

  const createDummyWindows = () => {
    let windowWidth = 125;
    for (let i = 0; i < 5; i++) {
      windowWidth = 125 + i * 125;
      windows.push({
        tecido: '105 102',
        tipo: 'Ondas',
        medidas: `${windowWidth} X 250`,
        correcao: i % 2 === 0 ? false : true,
        calha: '5000 - Branco',
        instalacao: i % 2 === 0 ? true : false,
      });
    }
  };

  const getCalhas = () => {
    fetch(
      'https://docs.google.com/spreadsheets/d/1rLeS62q8uY3PPSRZSEokJY7q5uS4Qh9aNx8VFPg2cF8/export?format=csv'
    )
      .then((response) => response.text())
      .then((csvData) => {
        // You can parse the CSV data here
        debugger;
        console.log(csvData);
      })
      .catch((error) => console.error('Error fetching CSV data:', error));
    //     const apiKey = 'AIzaSyBWzwRG36cNOjAIGb8TyJ4-6fBB1PIRky8'; // Replace with your actual API key
    //     const sheetId = '1rLeS62q8uY3PPSRZSEokJY7q5uS4Qh9aNx8VFPg2cF8'; // Sheet ID you provided
    //     const range = 'Sheet1!A10:H42'; // Specify the range to cover your table (adjust based on your data)
    //     const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    // 'https://sheets.googleapis.com/v4/spreadsheets/1rLeS62q8uY3PPSRZSEokJY7q5uS4Qh9aNx8VFPg2cF8/values/Sheet1!A10:H42?key=AIzaSyBWzwRG36cNOjAIGb8TyJ4'
    //     fetch(url)
    //       .then((response) => response.json())
    //       .then((data) => {
    //         console.log(data);
    //       });
  };

  nextButton.addEventListener('click', advanceStep);

  addOnClickToInicioCards();
  addOnClickToTecidoCards();
  addOnClickToCalhaCards();
  addOnClickToTipoCards();
  addOnClickColor();
  addOnClickEnviar();
  addOnClickNewWindow();
  addOnClickNoWindow();
  addOnClickCheckoutChoices();
  createDummyWindows();
});
