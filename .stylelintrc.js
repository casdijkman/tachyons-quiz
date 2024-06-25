module.exports = {
    plugins: [
        'stylelint-scss'
    ],
    extends: 'stylelint-config-standard',
    rules: {
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
        'indentation': 2,
        'number-leading-zero': 'never',
        'declaration-empty-line-before': 'never',
        'selector-list-comma-newline-after': 'always-multi-line',
        'no-descending-specificity': null,
        'string-quotes': [
            'single',
            {
                avoidEscape: false
            }
        ],
        'declaration-bang-space-before': 'always',
        'declaration-bang-space-after': 'never',
        'block-closing-brace-newline-after': [
            'always',
            {
                ignoreAtRules: ['if', 'else']
            }
        ],
        'at-rule-empty-line-before': [
            'always',
            {
                except: ['blockless-after-same-name-blockless', 'first-nested'],
                ignore: ['after-comment'],
                ignoreAtRules: ['else']
            },
        ],
    }
};
