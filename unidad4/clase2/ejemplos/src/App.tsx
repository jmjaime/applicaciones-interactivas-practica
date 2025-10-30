import { useState } from 'react'
import './App.css'

// Styling
import Example1CSSGlobal from './components/styling/Example1CSSGlobal'
import Example2InlineStyles from './components/styling/Example2InlineStyles'
import Example3CSSModules from './components/styling/Example3CSSModules'
import Example4ConditionalClasses from './components/styling/Example4ConditionalClasses'

// Refs
import Example1AutoFocus from './components/refs/Example1AutoFocus'
import Example2ReadValues from './components/refs/Example2ReadValues'
import Example3Scroll from './components/refs/Example3Scroll'
import Example4RenderCounter from './components/refs/Example4RenderCounter'

// Effects
import Example1FetchBasic from './components/effects/Example1FetchBasic'
import Example2WithDependencies from './components/effects/Example2WithDependencies'
import Example3Cleanup from './components/effects/Example3Cleanup'
import Example4MultipleEffects from './components/effects/Example4MultipleEffects'
import Example5AsyncAwait from './components/effects/Example5AsyncAwait'

// Forms
import Example1Controlled from './components/forms/Example1Controlled'
import Example2Uncontrolled from './components/forms/Example2Uncontrolled'
import Example3FormData from './components/forms/Example3FormData'
import Example4FormActions from './components/forms/Example4FormActions'
import Example5UseActionState from './components/forms/Example5UseActionState'

/**
 * Aplicación principal de ejemplos
 */

function App() {
    const [currentExample, setCurrentExample] = useState<string>('home')

    return (
        <div className="app">
            <nav className="sidebar">
                <h1>React Avanzado</h1>
                <h2>Ejemplos</h2>

                <section>
                    <h3>🎨 Styling</h3>
                    <button onClick={() => setCurrentExample('styling-1')}>1.1 CSS Global</button>
                    <button onClick={() => setCurrentExample('styling-2')}>1.2 Inline Styles</button>
                    <button onClick={() => setCurrentExample('styling-3')}>1.3 CSS Modules</button>
                    <button onClick={() => setCurrentExample('styling-4')}>1.4 Clases Condicionales</button>
                </section>

                <section>
                    <h3>🔗 Refs</h3>
                    <button onClick={() => setCurrentExample('refs-1')}>2.1 Auto-focus</button>
                    <button onClick={() => setCurrentExample('refs-2')}>2.2 Leer Valores</button>
                    <button onClick={() => setCurrentExample('refs-3')}>2.3 Scroll</button>
                    <button onClick={() => setCurrentExample('refs-4')}>2.4 Render Counter</button>
                </section>

                <section>
                    <h3>⚡ Side Effects</h3>
                    <button onClick={() => setCurrentExample('effects-1')}>3.1 Fetch Básico</button>
                    <button onClick={() => setCurrentExample('effects-2')}>3.2 Con Dependencias</button>
                    <button onClick={() => setCurrentExample('effects-3')}>3.3 Cleanup</button>
                    <button onClick={() => setCurrentExample('effects-4')}>3.4 Multiple Effects</button>
                    <button onClick={() => setCurrentExample('effects-5')}>3.5 Async/Await</button>
                </section>

                <section>
                    <h3>📝 Forms</h3>
                    <button onClick={() => setCurrentExample('forms-1')}>4.1 Controlled</button>
                    <button onClick={() => setCurrentExample('forms-2')}>4.2 Uncontrolled</button>
                    <button onClick={() => setCurrentExample('forms-3')}>4.3 FormData</button>
                    <button onClick={() => setCurrentExample('forms-4')}>4.4 Form Actions</button>
                    <button onClick={() => setCurrentExample('forms-5')}>4.5 useActionState</button>
                </section>
            </nav>

            <main className="content">
                {currentExample === 'home' && (
                    <div className="home">
                        <h1>Bienvenido a los Ejemplos de React</h1>
                        <p>Selecciona un ejemplo del menú lateral para comenzar.</p>
                        <p>Cada ejemplo es interactivo y muestra los conceptos en acción.</p>
                        <p><strong>💡 Tip:</strong> Abre la consola del navegador (F12) para ver logs útiles.</p>
                    </div>
                )}

                {/* Styling examples */}
                {currentExample === 'styling-1' && <Example1CSSGlobal />}
                {currentExample === 'styling-2' && <Example2InlineStyles />}
                {currentExample === 'styling-3' && <Example3CSSModules />}
                {currentExample === 'styling-4' && <Example4ConditionalClasses />}

                {/* Refs examples */}
                {currentExample === 'refs-1' && <Example1AutoFocus />}
                {currentExample === 'refs-2' && <Example2ReadValues />}
                {currentExample === 'refs-3' && <Example3Scroll />}
                {currentExample === 'refs-4' && <Example4RenderCounter />}

                {/* Effects examples */}
                {currentExample === 'effects-1' && <Example1FetchBasic />}
                {currentExample === 'effects-2' && <Example2WithDependencies />}
                {currentExample === 'effects-3' && <Example3Cleanup />}
                {currentExample === 'effects-4' && <Example4MultipleEffects />}
                {currentExample === 'effects-5' && <Example5AsyncAwait />}

                {/* Forms examples */}
                {currentExample === 'forms-1' && <Example1Controlled />}
                {currentExample === 'forms-2' && <Example2Uncontrolled />}
                {currentExample === 'forms-3' && <Example3FormData />}
                {currentExample === 'forms-4' && <Example4FormActions />}
                {currentExample === 'forms-5' && <Example5UseActionState />}
            </main>
        </div>
    )
}

export default App

