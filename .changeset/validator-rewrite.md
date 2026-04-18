---
"@txjs/validator": major
---

Rewrite validator package with BaseValidator + antd/vant adapters

- Replace `Validator` class with abstract `BaseValidator` and two concrete subclasses: `AntdValidator` and `VantValidator`
- Remove `Message` and `Validation` class wrappers; use plain typed objects (`locales`, `rules`) instead
- Redesign `schema()` API: each field now takes a `FieldConfig` with an ordered `rules` array, guaranteeing validation sequence
- `VantValidator` automatically maps `blur/change` triggers to vant's `onBlur/onChange` format
- Add `antd` and `vant` as separate entry points (`@txjs/validator/antd`, `@txjs/validator/vant`)
- Rename `defaults` entry to `rules` (`@txjs/validator/rules`)
- Remove `extend` dependency
