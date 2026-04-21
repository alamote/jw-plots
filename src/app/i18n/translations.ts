export type AppLanguage = 'uk' | 'ru';

export type TranslationKey =
  | 'app.brandSubtitle'
  | 'nav.overview'
  | 'nav.territories'
  | 'nav.admin'
  | 'lang.label'
  | 'lang.uk'
  | 'lang.ru'
  | 'overview.eyebrow'
  | 'overview.title'
  | 'overview.lede'
  | 'overview.openPool'
  | 'overview.openAdmin'
  | 'overview.availableNow'
  | 'overview.bookedByUsers'
  | 'overview.processed'
  | 'overview.totalPlots'
  | 'overview.priorityTerritories'
  | 'overview.priorityDescription'
  | 'territories.title'
  | 'territories.subtitle'
  | 'territories.availableTitle'
  | 'territories.book'
  | 'territories.emptyAvailable'
  | 'territories.myTitle'
  | 'territories.status'
  | 'territories.lastUpdated'
  | 'territories.markProcessed'
  | 'territories.returnToPool'
  | 'territories.emptyMine'
  | 'admin.title'
  | 'admin.subtitle'
  | 'admin.territoryNumber'
  | 'admin.name'
  | 'admin.area'
  | 'admin.city'
  | 'admin.priority'
  | 'admin.notes'
  | 'admin.polygonJson'
  | 'admin.polygonHint'
  | 'admin.addPlot'
  | 'admin.newResidentialCluster'
  | 'admin.northDistrict'
  | 'map.title'
  | 'map.description'
  | 'map.fallback'
  | 'status.available'
  | 'status.booked'
  | 'status.processed'
  | 'priority.normal'
  | 'priority.high'
  | 'priority.urgent'
  | 'admin.action.available'
  | 'admin.action.booked'
  | 'admin.action.processed';

export const translations: Record<AppLanguage, Record<TranslationKey, string>> = {
  uk: {
    'app.brandSubtitle': 'Бронювання та обробка територій',
    'nav.overview': 'Огляд',
    'nav.territories': 'Території',
    'nav.admin': 'Адмінка',
    'lang.label': 'Мова',
    'lang.uk': 'Українська',
    'lang.ru': 'Русский',
    'overview.eyebrow': 'Операції з територіями',
    'overview.title': 'Призначайте території, відстежуйте обробку та керуйте полігонами мапи в одному місці.',
    'overview.lede':
      'Цей прототип покриває основний процес: користувачі беруть доступні території з пулу, обробляють їх, повертають за потреби, а адміністратори підтримують записи територій з даними полігонів для Google Maps.',
    'overview.openPool': 'Відкрити пул територій',
    'overview.openAdmin': 'Відкрити адмінку',
    'overview.availableNow': 'Доступно зараз',
    'overview.bookedByUsers': 'Заброньовано користувачами',
    'overview.processed': 'Оброблено',
    'overview.totalPlots': 'Усього територій',
    'overview.priorityTerritories': 'Пріоритетні території',
    'overview.priorityDescription': 'Тестові дані, які можна розширити з адмінки.',
    'territories.title': 'Пул територій',
    'territories.subtitle': 'Візьміть доступну територію, позначте її як оброблену або поверніть у пул для іншого користувача.',
    'territories.availableTitle': 'Доступні території',
    'territories.book': 'Забронювати територію',
    'territories.emptyAvailable': 'Зараз немає доступних територій.',
    'territories.myTitle': 'Мої активні території',
    'territories.status': 'Статус',
    'territories.lastUpdated': 'Оновлено',
    'territories.markProcessed': 'Позначити як оброблену',
    'territories.returnToPool': 'Повернути в пул',
    'territories.emptyMine': 'У вас немає призначених територій.',
    'admin.title': 'Адмін-зона',
    'admin.subtitle': 'Керуйте територіями, додавайте нові полігони та змінюйте статус за потреби.',
    'admin.territoryNumber': 'Номер території',
    'admin.name': 'Назва',
    'admin.area': 'Район',
    'admin.city': 'Місто',
    'admin.priority': 'Пріоритет',
    'admin.notes': 'Нотатки',
    'admin.polygonJson': 'JSON полігону',
    'admin.polygonHint': 'Використовуйте масив точок { lat, lng } у напрямку за годинниковою стрілкою.',
    'admin.addPlot': 'Додати територію',
    'admin.newResidentialCluster': 'Новий житловий квартал',
    'admin.northDistrict': 'Північний район',
    'map.title': 'Google Map',
    'map.description': 'Території відображаються як полігони. Координати, додані адміністратором, з’являються тут одразу.',
    'map.fallback': 'Додайте Google Maps API key у src/environments/environment*.ts, щоб відобразити живу мапу.',
    'status.available': 'доступна',
    'status.booked': 'заброньована',
    'status.processed': 'оброблена',
    'priority.normal': 'звичайний',
    'priority.high': 'високий',
    'priority.urgent': 'терміновий',
    'admin.action.available': 'Доступна',
    'admin.action.booked': 'Заброньована',
    'admin.action.processed': 'Оброблена'
  },
  ru: {
    'app.brandSubtitle': 'Бронирование и обработка территорий',
    'nav.overview': 'Обзор',
    'nav.territories': 'Территории',
    'nav.admin': 'Админка',
    'lang.label': 'Язык',
    'lang.uk': 'Українська',
    'lang.ru': 'Русский',
    'overview.eyebrow': 'Операции с территориями',
    'overview.title': 'Назначайте территории, отслеживайте обработку и управляйте полигонами карты в одном месте.',
    'overview.lede':
      'Этот прототип покрывает основной процесс: пользователи берут доступные территории из пула, обрабатывают их, возвращают при необходимости, а администраторы поддерживают записи территорий с данными полигонов для Google Maps.',
    'overview.openPool': 'Открыть пул территорий',
    'overview.openAdmin': 'Открыть админку',
    'overview.availableNow': 'Доступно сейчас',
    'overview.bookedByUsers': 'Забронировано пользователями',
    'overview.processed': 'Обработано',
    'overview.totalPlots': 'Всего территорий',
    'overview.priorityTerritories': 'Приоритетные территории',
    'overview.priorityDescription': 'Тестовые данные, которые можно расширить из админки.',
    'territories.title': 'Пул территорий',
    'territories.subtitle': 'Возьмите доступную территорию, отметьте её как обработанную или верните в пул для другого пользователя.',
    'territories.availableTitle': 'Доступные территории',
    'territories.book': 'Забронировать территорию',
    'territories.emptyAvailable': 'Сейчас нет доступных территорий.',
    'territories.myTitle': 'Мои активные территории',
    'territories.status': 'Статус',
    'territories.lastUpdated': 'Обновлено',
    'territories.markProcessed': 'Отметить как обработанную',
    'territories.returnToPool': 'Вернуть в пул',
    'territories.emptyMine': 'У вас нет назначенных территорий.',
    'admin.title': 'Админ-зона',
    'admin.subtitle': 'Управляйте территориями, добавляйте новые полигоны и меняйте статус при необходимости.',
    'admin.territoryNumber': 'Номер территории',
    'admin.name': 'Название',
    'admin.area': 'Район',
    'admin.city': 'Город',
    'admin.priority': 'Приоритет',
    'admin.notes': 'Заметки',
    'admin.polygonJson': 'JSON полигона',
    'admin.polygonHint': 'Используйте массив точек { lat, lng } по часовой стрелке.',
    'admin.addPlot': 'Добавить территорию',
    'admin.newResidentialCluster': 'Новый жилой квартал',
    'admin.northDistrict': 'Северный район',
    'map.title': 'Google Map',
    'map.description': 'Территории отображаются как полигоны. Координаты, добавленные администратором, появляются здесь сразу.',
    'map.fallback': 'Добавьте Google Maps API key в src/environments/environment*.ts, чтобы отобразить живую карту.',
    'status.available': 'доступна',
    'status.booked': 'забронирована',
    'status.processed': 'обработана',
    'priority.normal': 'обычный',
    'priority.high': 'высокий',
    'priority.urgent': 'срочный',
    'admin.action.available': 'Доступна',
    'admin.action.booked': 'Забронирована',
    'admin.action.processed': 'Обработана'
  }
};
