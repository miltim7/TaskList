export default function validateDescription(description) {
    if (description.trim().length === 0) {
        alert('Minimum 1 word in Description!');
        return false;
    }

    return true;
}