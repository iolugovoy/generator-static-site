# Шаблон для вёрстки сайтов

## Установка
Сброщик оформлен в виде [yeoman](https://yeoman.io/) генератора. Если у вас не установлен yeoman:
```npm install -g yeoman```

Далее установите этот сброщик из этого репозитория:
```npm install https://bitbucket.org/braindteam/generator-static-site.git```

Затем запустите генератор:
```yo static-site```


## Структура
```
├── gulp/                      # Folder for gulp tasks
├── build/                     # Folder for production build output
├── tmp/                       # Folder for temporary development output
├── src
|   ├── _data                  # JSON/YAML files that add data to templates
|   ├── _images                # Images
|   ├── _layouts               # Layout structure for app
|   |   └── base.jade
|   ├── _modules               # Reusable modules
|   |   └── link
|   |       ├── __tests__
|   |       |   └── link.spec.js
|   |       ├── link.jade
|   |       ├── link.js
|   |       └── link.scss
|   ├── _styles               # Global styles, mixins, variables, etc
|   |   └── main.scss         # Main stylesheet (import everything to this file)
|   ├── _scripts              # Global scripts, base classes, etc
|   |   └── main.js           # Main bootstrap file
|   ├── fonts                 # Fonts (Example, will not be generated)
|   ├── index.jade            # Homepage template
|   ├── favicon.ico
|   └── robots.txt
├── gulpfile.js               # Gulp task configuration
└── package.json              # Dependencies and site/folder configuration
```

## Вспомогательные генераторы

* [static-site:page](#page)
* [static-site:module](#module)
* [static-site:layout](#layout)


## Команды
* ```npm run dev``` – запуск web-сервера и отслеживание изменений
* ```npm run build``` – production сборка 
* ```npm run lighthouse``` – аудит вёрстки 
* ```npm run lint``` – проверка кода линтерами
