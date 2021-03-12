export function formatDateToLocaleString(str) {
  if (!str) return '';
  let data = new Date(str);

  return `${('00' + data.getUTCDate()).slice(-2)}/${(
    '00' +
    (data.getUTCMonth() + 1)
  ).slice(-2)}/${data.getUTCFullYear()}`;
}

export function formatDateBR(date) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

export function formatDateUS(date) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('fr-ca', { timeZone: 'UTC' });
}

export function calculateTimeBetweenTwoDates(date, type) {
  const inputDate = new Date(date);
  const now = new Date(Date.now());
  let diffTime = Math.abs(inputDate.getTime() - now.getTime());
  let result;

  switch (type) {
    case 'idade':
      result = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
      break;

    case 'tempoEmpresa':
      result = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
      break;

    default:
      break;
  }

  return result;
}
