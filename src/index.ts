window.Webflow ||= [];

window.Webflow.push(() => {
  let productsData = {};
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
  const selectedColors = [];

  const simulatorHeadings = {
    step1: document.getElementById('simulator-heading-1'),
    step2: document.getElementById('simulator-heading-2'),
    step3: document.getElementById('simulator-heading-3'),
    step4: document.getElementById('simulator-heading-4'),
    step5: document.getElementById('simulator-heading-5'),
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

  const MANUFACTURING_CONSTANTS = {
    usedWidths: [
      { name: 'Franzido', widthRatio: 2.5 },
      { name: 'Ondas', widthRatio: 2.7 },
      { name: 'Macho Juntos', widthRatio: 3 },
      { name: 'Pregas', widthRatio: 2.5 },
    ],
    manufacturingPrices: [
      {
        name: 'Franzido',
        blackout: 9,
        normal: 8,
      },
      {
        name: 'Ondas',
        blackout: 8.5,
        normal: 7.5,
      },
      {
        name: 'Macho Juntos',
        normal: 13.5,
      },
      {
        name: 'Pregas',
        normal: 13.5,
      },
    ],
    maxWindowWidth: 6,
    maxWindowHeight: 3,
    measuresCheckPrice: 30,
    instalation: [
      { maxWidth: 300, price: 30 },
      { maxWidth: 400, price: 40 },
      { maxWidth: 500, price: 45 },
      { maxWidth: 600, price: 50 },
    ],
  };

  const calculateUsedWidth = (window) => {
    const usedWidth = MANUFACTURING_CONSTANTS.usedWidths.find((usedWidth) => {
      return window.tipo === usedWidth.name;
    });
    if (usedWidth) {
      const width = window.medidas ? parseInt(window.medidas.split(' X ')[0]) : 0;
      return width * usedWidth.widthRatio;
    }
    return 0;
  };

  const getProductPrice = (window) => {
    let productPrice = 0.0,
      calhaPrice = 0.0,
      reference = '';

    const productDetails = window.tecido.split('-');
    const product = productDetails[0];
    const color = productDetails[1];
    const calhaDetails = window.calha ? window.calha.split(' - ') : null;
    const calha = calhaDetails ? calhaDetails[0] : null;
    const calhaColor = calhaDetails ? calhaDetails[1] : null;
    const width = window.medidas ? window.medidas.split(' X ')[0] : 0;

    if (window.inicio === 'Cortina') {
      reference = `${product}${color}`;
    }

    if (window.inicio === 'Estore') {
      const height = window.medidas ? window.medidas.split(' X ')[1] : 0;
      reference = `${product}${height}${width}${color}`;
    }
    productPrice =
      typeof productsData[reference].price === 'string'
        ? parseFloat(productsData[reference].price)
        : productsData[reference].price;

    const calhaReference = `${calha}${width}${calhaColor}`;
    calhaPrice = calhaSizes[calhaReference] ? calhaSizes[calhaReference] : 0;
    return { product: productPrice, calha: calhaPrice };
  };

  const calculateMaterialPrice = (window, usedWidth) => {
    const width = window.medidas.split(' X ')[0];
    let productPrice = 0.0,
      calhaPrice = 0.0;
    const prices = getProductPrice(window);

    if (window.inicio === 'Cortina') {
      productPrice = prices.product * (usedWidth / 100);
    }
    calhaPrice = prices.calha * (width / 100);
    return productPrice && calhaPrice
      ? productPrice + calhaPrice
      : productPrice
        ? productPrice
        : calhaPrice
          ? calhaPrice
          : 0;
  };

  const calculateManufacturingPrice = (window, usedWidth) => {
    if (window.inicio === 'Estore') {
      return 0;
    }
    const manufacturingPrice = MANUFACTURING_CONSTANTS.manufacturingPrices.find(
      (price) => window.tipo === price.name
    );
    if (manufacturingPrice) {
      return window.tecido.startsWith('101')
        ? manufacturingPrice.blackout * (usedWidth / 100)
        : manufacturingPrice.normal * (usedWidth / 100);
    }

    return 0;
  };

  const calculateMeasuresCheckPrice = (window) => {
    return !window.correcao
      ? 0
      : window.instalacao
        ? 0
        : MANUFACTURING_CONSTANTS.measuresCheckPrice;
  };

  const calculateInstalationPrice = (window) => {
    if (!window.instalacao) {
      return 0;
    }
    const largura = parseInt(window.medidas.split(' X ')[0]);

    const instalationPrice = MANUFACTURING_CONSTANTS.instalation.find(
      (price) => largura < price.maxWidth
    );
    return instalationPrice ? instalationPrice.price : 0;
  };

  const calculateWindowPrice = (window) => {
    const totalWidth = calculateUsedWidth(window);
    const materialPrice = calculateMaterialPrice(window, totalWidth);
    const manufacturingPrice = calculateManufacturingPrice(window, totalWidth);
    const measuresCheckPrice = calculateMeasuresCheckPrice(window);
    const instalationPrice = calculateInstalationPrice(window);
    const result = materialPrice + manufacturingPrice + measuresCheckPrice + instalationPrice;
    return result;
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
          changeSelectorVisibility(simulatorHeadings.step1, false);
          changeSelectorVisibility(selectors.tecido, false);
          changeSelectorVisibility(simulatorHeadings.step2, true);
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
          changeSelectorVisibility(simulatorHeadings.step2, false);
          changeSelectorVisibility(selectors.bainha, false);
          changeSelectorVisibility(simulatorHeadings.step3, true);
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
        changeSelectorVisibility(simulatorHeadings.step3, false);
        changeSelectorVisibility(selectors.correcao, false);
        changeSelectorVisibility(simulatorHeadings.step4, true);
        changeSelectorVisibility(selectors.calha, true);
        currentStep = 'calha';
        break;
      case 'calha':
        if (validateSelector('calha')) {
          markStepAsCompleted('calha');
          markStepAsActive('instalacao');
          changeSelectorVisibility(simulatorHeadings.step4, false);
          changeSelectorVisibility(selectors.calha, false);
          changeSelectorVisibility(simulatorHeadings.step5, true);
          changeSelectorVisibility(selectors.instalacao, true);
          currentStep = 'instalacao';
        }
        break;
      case 'instalacao':
        populateCheckoutChoices();
        markStepAsCompleted('instalacao');
        changeSelectorVisibility(simulatorHeadings.step5, false);
        changeSelectorVisibility(selectors.instalacao, false);
        storeValues();
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
    switch (step) {
      case 'tecido':
        changeSelectorVisibility(simulatorHeadings.step1, true);
        changeSelectorVisibility(selectors.tecido, true);
        break;
      case 'tipo':
        changeSelectorVisibility(simulatorHeadings.step2, true);
        changeSelectorVisibility(selectors.tipo, true);
        break;
      case 'medidas':
        changeSelectorVisibility(simulatorHeadings.step3, true);
        changeSelectorVisibility(selectors.medidas, true);
        break;
      case 'calha':
        changeSelectorVisibility(simulatorHeadings.step4, true);
        changeSelectorVisibility(selectors.calha, true);
        break;
      case 'instalacao':
        changeSelectorVisibility(simulatorHeadings.step5, true);
        changeSelectorVisibility(selectors.instalacao, true);
        break;
    }
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
        const text = card.getElementsByTagName('h1')[0].textContent;
        const existingSelection = selectedColors.find((color) => color.product === text);
        if (existingSelection) {
          return selectorValues.inicio === 'Cortina'
            ? updateSelectorValue(
                selectors.tecido,
                `${existingSelection.color.substring(0, 6)}-${existingSelection.color.substring(6)}`
              )
            : updateSelectorValue(selectors.tecido, existingSelection.color);
        }
        const img = card.getElementsByTagName('img')[0].src;
        const productPart1 = text.substring(0, 3);
        const productPart2 = text.substring(3);
        const color = img
          .split(`${productPart1}-${productPart2}`)[1]
          .split('-')
          .filter((str) => str.length === 3)[0];
        return updateSelectorValue(selectors.tecido, `${productPart1}${productPart2}-${color}`);

        // img.split(`${text.substring(0,3)}-${text.substring(3)}`)[1].split('-').filter(str => str.length === 3)
        // updateSelectorValue(selectors.tecido, card.getElementsByTagName('h1')[0].textContent);
        // updateSelectorValue(selectors.tecido, card.getElementsByTagName('h1')[0].textContent);
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
        const selectedDiv = event.currentTarget;
        const selectedColor = selectedDiv.id;
        const product = selectedColor ? selectedColor.split('-')[0] : '';
        const color = selectedColor ? selectedColor.split('-')[1] : '';
        const latestSelection = selectedColors.find((color) => color.product === product);

        if (latestSelection) {
          latestSelection.color = `${product}${color}`;
        } else {
          selectedColors.push({ product: product, color: `${product}${color}` });
        }

        const cardThumbnailImage =
          selectedDiv.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
            'tecido_image'
          )[0];

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
      inicio: selectorValues.inicio,
      bainha: selectorValues.bainha,
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
    resetValues();
    navigateFromCheckoutToStep('inicio');
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
  };

  const createDummyWindows = () => {
    let windowWidth = 125;
    for (let i = 0; i < 5; i++) {
      windowWidth = 125 + i * 125;
      windows.push({
        inicio: 'Cortina',
        tecido: '101015-003',
        tipo: 'Ondas',
        medidas: `${windowWidth} X 250`,
        correcao: i % 2 === 0 ? false : true,
        calha: '5000-Branco',
        instalacao: i % 2 === 0 ? true : false,
      });
    }
  };

  const fetchProducts = () => {
    // 'https://docs.google.com/spreadsheets/d/1rLeS62q8uY3PPSRZSEokJY7q5uS4Qh9aNx8VFPg2cF8/export?format=csv'
    // `https://docs.google.com/spreadsheets/d/1acI1UfB7ukEPc2r4Sf_s4pax0um2IsVvlGDGaiMSNIU/export?format=csv&gid=2133468022`
    // `https://docs.google.com/spreadsheets/d/1BeQJvMh5moFM9ELRQG7QsDUa_CLfiqZ9/export?format=csv&gid=2133468022`
    fetch(
      `https://docs.google.com/spreadsheets/d/1acI1UfB7ukEPc2r4Sf_s4pax0um2IsVvlGDGaiMSNIU/export?format=csv&gid=2133468022`
    )
      .then((response) => response.text())
      .then((csvData) => {
        const lines = csvData.trim().split('\n');
        const headers = lines[0].split(',');
        const data = lines.slice(1).map((line) => line.split(','));
        // Create the JSON structure
        const jsonData = {};

        data.forEach((row) => {
          const [id, price] = row;
          if (!jsonData[id]) {
            jsonData[id] = { id: id, price: parseFloat(price) };
          }
        });

        productsData = jsonData;
      })
      .catch((error) => console.error('Error fetching CSV data:', error));
  };

  const addOnClickNextButton = () => {
    nextButton.addEventListener('click', advanceStep);
  };

  fetchProducts();
  addOnClickNextButton();
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
