function generateRGBAValues(n: number) {
    const rgbaValues = [];

    for (let i = 0; i < n; i++) {
        let red, green, blue;

        // Generate random RGB values until a dark enough color is obtained
        do {
            red = Math.floor(Math.random() * 256);
            green = Math.floor(Math.random() * 256);
            blue = Math.floor(Math.random() * 256);
        } while (red + green + blue > 500); // Adjust the threshold as needed

        const alpha = Math.random().toFixed(2);

        const rgbaValue = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        rgbaValues.push(rgbaValue);
    }

    return rgbaValues;
}
export default generateRGBAValues