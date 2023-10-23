export default function validateName(name) {
    name = name.replace(/\s+/g, ' ');

    const words = name.trim().split(/\s+/);
    if (words.length < 2) {
        alert('Minimum 2 words in Name!');
        return false;
    }

    let err = false;
    words.forEach(word => {
        if (word.length > 16) {
            alert('Words length cant be more than 16!');
            err = true;
        }
    })
    if (err) {
        return false;
    }

    const wordRegex = /^[a-zA-Zа-яА-Я0-9]+$/;
    words.forEach(word => {
        if (!wordRegex.test(word)) {
            alert('Only Dgigits, Russian/English letters')
            return false;
        }
    })

    const regex = /[a-zA-Zа-яА-Я]/;
    if (!regex.test(name)) {
        alert(`Can't be without letters!`)
        return false; 
    }

    return true;
}