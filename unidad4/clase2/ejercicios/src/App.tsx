import { useState } from 'react'
import './App.css'
import { exercises } from './exerciseInstructions'

/**
 * MusicStream App - Ejercicios de React
 */

function App() {
    const [currentExercise, setCurrentExercise] = useState<string>('home')
    const exercise = exercises[currentExercise]

    return (
        <div className="app">
            <nav className="sidebar">
                <div className="logo">
                    <h1>🎵 MusicStream</h1>
                    <p>Ejercicios React</p>
                </div>

                <section className="nav-section">
                    <h3>🎨 Styling</h3>
                    <button onClick={() => setCurrentExercise('styling-1')}>
                        1.1 SongCard
                    </button>
                    <button onClick={() => setCurrentExercise('styling-2')}>
                        1.2 Theme Toggle
                    </button>
                    <button onClick={() => setCurrentExercise('styling-3')}>
                        1.3 Category Filters
                    </button>
                    <button onClick={() => setCurrentExercise('styling-4')}>
                        1.4 Progress Bar
                    </button>
                </section>

                <section className="nav-section">
                    <h3>🔗 Refs</h3>
                    <button onClick={() => setCurrentExercise('refs-1')}>
                        2.1 SearchBar
                    </button>
                    <button onClick={() => setCurrentExercise('refs-2')}>
                        2.2 Audio Player
                    </button>
                    <button onClick={() => setCurrentExercise('refs-3')}>
                        2.3 Scroll Comment
                    </button>
                    <button onClick={() => setCurrentExercise('refs-4')}>
                        2.4 Render Counter
                    </button>
                </section>

                <section className="nav-section">
                    <h3>⚡ Side Effects</h3>
                    <button onClick={() => setCurrentExercise('effects-1')}>
                        3.1 Load Playlist
                    </button>
                    <button onClick={() => setCurrentExercise('effects-2')}>
                        3.2 Search Debounce
                    </button>
                    <button onClick={() => setCurrentExercise('effects-3')}>
                        3.3 Playback Timer
                    </button>
                    <button onClick={() => setCurrentExercise('effects-4')}>
                        3.4 localStorage Sync
                    </button>
                    <button onClick={() => setCurrentExercise('effects-5')}>
                        3.5 Polling
                    </button>
                </section>

                <section className="nav-section">
                    <h3>📝 Forms</h3>
                    <button onClick={() => setCurrentExercise('forms-1')}>
                        4.1 Create Playlist
                    </button>
                    <button onClick={() => setCurrentExercise('forms-2')}>
                        4.2 Quick Comment
                    </button>
                    <button onClick={() => setCurrentExercise('forms-3')}>
                        4.3 Advanced Filters
                    </button>
                    <button onClick={() => setCurrentExercise('forms-4')}>
                        4.4 Add to Favorites
                    </button>
                    <button onClick={() => setCurrentExercise('forms-5')}>
                        4.5 Song Rating
                    </button>
                </section>

                <section className="nav-section">
                    <h3>🏆 Integrador</h3>
                    <button onClick={() => setCurrentExercise('integrador')}>
                        Dashboard Completo
                    </button>
                </section>
            </nav>

            <main className="content">
                {currentExercise === 'home' && (
                    <div className="home">
                        <h1>🎵 Bienvenido a MusicStream</h1>
                        <p className="subtitle">Ejercicios de React</p>

                        <div className="info-card">
                            <h2>📚 Instrucciones</h2>
                            <ol>
                                <li>Lee el <code>README.md</code> para ver los requisitos de cada ejercicio</li>
                                <li>Selecciona un ejercicio del menú lateral</li>
                                <li>Crea tu componente en <code>src/components/</code></li>
                                <li>Importa y usa el componente en este archivo</li>
                                <li>Prueba que funcione correctamente</li>
                            </ol>
                        </div>

                        <div className="info-card">
                            <h2>🎯 Objetivos</h2>
                            <p>Practica cada concepto con ejercicios progresivos que construyen una aplicación de streaming de música.</p>
                            <ul>
                                <li><strong>Styling:</strong> 4 ejercicios</li>
                                <li><strong>Refs:</strong> 4 ejercicios</li>
                                <li><strong>Side Effects:</strong> 5 ejercicios</li>
                                <li><strong>Forms:</strong> 5 ejercicios</li>
                                <li><strong>Integrador:</strong> 1 ejercicio completo</li>
                            </ul>
                        </div>

                        <div className="info-card">
                            <h2>💡 Tips</h2>
                            <ul>
                                <li>Revisa los ejemplos en <code>../ejemplos/</code></li>
                                <li>Usa TypeScript para mejor autocompletado</li>
                                <li>Consulta las slides de clase cuando lo necesites</li>
                                <li>Haz commits frecuentes de tu progreso</li>
                            </ul>
                        </div>
                    </div>
                )}

                {currentExercise !== 'home' && exercise && (
                    <div className="exercise-placeholder">
                        <h2>{exercise.title}</h2>

                        <div className="exercise-meta">
                            <span className="file-badge">📁 {exercise.file}</span>
                        </div>

                        <div className="exercise-section">
                            <h3>🎯 Objetivo</h3>
                            <p>{exercise.objective}</p>
                        </div>

                        <div className="exercise-section">
                            <h3>📝 Pasos a seguir</h3>
                            <ol className="steps-list">
                                {exercise.steps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>
                        </div>

                        {exercise.code && (
                            <div className="exercise-section">
                                <h3>💻 Código de referencia</h3>
                                <pre><code>{exercise.code}</code></pre>
                            </div>
                        )}

                        {exercise.tips && exercise.tips.length > 0 && (
                            <div className="exercise-section tips">
                                <h3>💡 Tips</h3>
                                <ul>
                                    {exercise.tips.map((tip, index) => (
                                        <li key={index}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="exercise-section implementation">
                            <h3>🔧 Cómo implementar</h3>
                            <ol>
                                <li>Crea tu componente en <code>src/components/{exercise.file}</code></li>
                                <li>Importa el componente al inicio de este archivo (App.tsx)</li>
                                <li>Úsalo en el render: <code>{`{currentExercise === '${currentExercise}' && <TuComponente />}`}</code></li>
                                <li>Verifica que funcione correctamente en el navegador</li>
                            </ol>
                        </div>

                        <div className="placeholder-content">
                            <p>⚠️ Este es el placeholder. Tu componente aparecerá aquí cuando lo implementes.</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default App

