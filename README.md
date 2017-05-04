# Storybook Groups
Add groups to the react storybook

## Install

```sh
$ npm i storybook-groups
```

## Example

```js
import {addGroups, Group} from "storybook-groups"

storiesOf('Button', module)
    .add('with text', () => (
        <Group name="buttons">
            <Button onClick={action('clicked')}>Hello Button</Button>
        </Group>
    ))

addGroups(storiesOf, module, getStorybook)
```
