import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/app'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faEdit, faPlus, faTrashAlt, faAlignLeft, faAlignJustify, faCogs } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee, faEdit, faPlus, faTrashAlt, faAlignLeft, faAlignJustify, faCogs )

ReactDOM.render(<App />, document.getElementById('root'))