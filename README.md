# Clean Architecture Schematics for Angular

Opinionated schematics for scaffolding Clean Architecture components.
- All components and features use PascalCase

## Installation
1. `npm run build`
2. `npm link`

## Scaffolding
`schematics clean-arch:<component> --name=<name> --feature=<feature>`

## Components
Supported components
- Entity
- Use Cases
- Repository (Interface and Implementation)
- Component (Like the ng Component, but consistent with the naming of the other components)
- Data Transfer Object
- Remote Objects
