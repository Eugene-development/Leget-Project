/**
 * Валидирует и нормализует доменное имя.
 * Возвращает { valid: boolean, normalized: string|null, error: string|null }
 */
export function validateDomain(input) {
  if (!input || typeof input !== 'string') {
    return { valid: false, normalized: null, error: 'Введите домен' };
  }
  
  let domain = input.trim().toLowerCase();
  
  // Убираем протокол
  domain = domain.replace(/^https?:\/\//, '');
  
  // Убираем путь и query-параметры
  domain = domain.replace(/\/.*$/, '');
  
  // Убираем www. (опционально — на твоё усмотрение, можно оставить)
  domain = domain.replace(/^www\./, '');
  
  // Базовая проверка формата домена
  const domainRegex = /^([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/;
  
  if (!domainRegex.test(domain)) {
    return { 
      valid: false, 
      normalized: null, 
      error: 'Неверный формат домена. Пример: example.com' 
    };
  }
  
  return { valid: true, normalized: domain, error: null };
}
