console.log(document.getElementById('bThickness').value);
console.log(document.getElementById('bRadius').value);
console.log(document.getElementById('bColor').value);

document.getElementById('bThickness').addEventListener('input', (event) => {
    document.getElementById('boxPreview').style.borderWidth = `${event.target.value}px`;
});

document.getElementById('bRadius').addEventListener('input', (event) => {
    document.getElementById('boxPreview').style.borderRadius = `${event.target.value}px`;
});

document.getElementById('bRadiusTopLeft').addEventListener('input', (event) => {
    document.getElementById('boxPreview').style.borderTopLeftRadius = `${event.target.value}px`;
});

document.getElementById('bRadiusTopRight').addEventListener('input', (event) => {
    document.getElementById('boxPreview').style.borderTopRightRadius = `${event.target.value}px`;
});

document.getElementById('bRadiusBottomLeft').addEventListener('input', (event) => {
    document.getElementById('boxPreview').style.borderBottomLeftRadius = `${event.target.value}px`;
});

document.getElementById('bRadiusBottomRight').addEventListener('input', (event) => {
    document.getElementById('boxPreview').style.borderBottomRightRadius = `${event.target.value}px`;
});

document.getElementById('bColor').addEventListener('change', (event) => {
    document.getElementById('boxPreview').style.borderColor = `${event.target.value}`;
});

document.getElementById('styles').addEventListener('change', (event) => {
    document.getElementById('boxPreview').style.borderStyle = `${event.target.value}`;
});

document.addEventListener('change', () => {
    let ruleStart = '#boxPreview {\n';
    let ruleEnd = '}';
    let css = ``;
    const style = document.getElementById('boxPreview').style.cssText.split(';');
    for (let rule in style) {
        if (style[rule]) {
            css += `\t${style[rule]};\n`;
        }
    }
    let generatedCss = `${ruleStart}${css}${ruleEnd}`;
    document.getElementById('generatedCss').value = generatedCss;
});

const handleCopyToClipboard = () => {
    const generatedCss = document.getElementById('generatedCss').value;

    console.log(generatedCss);

    navigator.clipboard.writeText(generatedCss)
        .then(() => alert('copied to clipboard!'))
        .catch((err) => {
        console.log(err);
    })
};

