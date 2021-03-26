export function birthValidator(birth) {
const bd = new RegExp("^(([1/9]|0[1/9]|1[0/9]|2[1/9]|3[0/1])[/]([01|02|03|04|05|06|07|08|09|10|11|12])[/](d{4}))$");
if (!birth || birth.length <= 0) return "Error: Birthdate is empty"
if (!bd.test(birth)) return 'Error: The format must be DD/MMM/YYYY'
return ''
}