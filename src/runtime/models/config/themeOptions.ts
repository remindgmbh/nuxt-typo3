export interface ThemeOptions {
    backgroundColors?: {
        [color: string]: string
    }
    contentElements?: {
        [contentElement: string]:
            | {
                  default?: any
                  backgroundColors?: {
                      [backgroundColor: string]: any
                  }
              }
            | undefined
    }
    additionalData: any
}
