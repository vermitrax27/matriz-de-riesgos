import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle, XCircle, HelpCircle, ArrowRight, ArrowLeft, Home } from 'lucide-react';

const FlujoProteccionDatos = () => {
  const [currentStep, setCurrentStep] = useState('inicio');
  const [answers, setAnswers] = useState({});
  const [showFactors, setShowFactors] = useState(false);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    // Lógica de navegación según las respuestas
    switch (questionId) {
      case 'q1_1':
        if (answer === 'no') {
          setCurrentStep('fin_domestico');
        } else {
          setCurrentStep('q1_2');
        }
        break;
      case 'q1_2':
        if (answer === 'no') {
          setCurrentStep('fin_territorial');
        } else {
          setCurrentStep('q2_1');
        }
        break;
      case 'q2_1':
        if (answer === 'si') {
          setCurrentStep('q3_1');
        } else if (answer === 'no') {
          setCurrentStep('q4_1');
        } else {
          setShowFactors(true);
        }
        break;
      case 'q3_1':
        if (answer === 'si') {
          setCurrentStep('resultado_b');
        } else if (answer === 'no') {
          setCurrentStep('resultado_a');
        } else {
          setCurrentStep('resultado_e');
        }
        break;
      case 'q4_1':
        if (answer === 'si') {
          setCurrentStep('q4_2');
        } else if (answer === 'no') {
          setCurrentStep('resultado_e');
        } else {
          setCurrentStep('resultado_e');
        }
        break;
      case 'q4_2':
        if (answer === 'si') {
          setCurrentStep('resultado_d');
        } else {
          setCurrentStep('resultado_c');
        }
        break;
    }
  };

  const resetFlow = () => {
    setCurrentStep('inicio');
    setAnswers({});
    setShowFactors(false);
  };

  const BackButton = ({ onClick }: { onClick: () => void }) => (
    <button 
      onClick={onClick}
      className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
    >
      <ArrowLeft className="w-4 h-4 mr-1" />
      Volver
    </button>
  );

  const QuestionCard = ({ title, children, helpText }: { title: string; children: React.ReactNode; helpText?: string }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      {children}
      {helpText && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
          <div className="flex items-start">
            <HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
            <p className="text-sm text-blue-800">{helpText}</p>
          </div>
        </div>
      )}
    </div>
  );

  const AnswerButton = ({ onClick, children, variant = 'primary' }: { onClick: () => void; children: React.ReactNode; variant?: 'primary' | 'secondary' | 'warning' }) => {
    const baseClasses = "w-full p-4 rounded-lg font-medium transition-colors mb-3 text-left";
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      warning: "bg-yellow-500 text-white hover:bg-yellow-600"
    };
    
    return (
      <button 
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]}`}
      >
        {children}
      </button>
    );
  };

  const ResultCard = ({ title, type, children, nextSteps }: { title: string; type: 'success' | 'warning' | 'error' | 'info'; children: React.ReactNode; nextSteps?: string[] }) => {
    const typeStyles = {
      success: { bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle, color: 'text-green-600' },
      warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: AlertTriangle, color: 'text-yellow-600' },
      error: { bg: 'bg-red-50', border: 'border-red-200', icon: XCircle, color: 'text-red-600' },
      info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: HelpCircle, color: 'text-blue-600' }
    };
    
    const style = typeStyles[type];
    const Icon = style.icon;
    
    return (
      <div className={`${style.bg} ${style.border} border rounded-lg p-6 max-w-4xl mx-auto`}>
        <div className="flex items-start mb-4">
          <Icon className={`w-6 h-6 ${style.color} mr-3 mt-1`} />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
            <div className="text-gray-700 mb-4">{children}</div>
            {nextSteps && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-3">Próximos Pasos Clave:</h3>
                <ul className="space-y-2">
                  {nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <ArrowRight className="w-4 h-4 text-gray-600 mr-2 mt-1" />
                      <span className="text-sm text-gray-700">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={resetFlow}
            className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Realizar nueva consulta
          </button>
          <Link 
            to="/"
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al repositorio
          </Link>
        </div>
      </div>
    );
  };

  // Componente principal de renderizado
  const renderStep = () => {
    switch (currentStep) {
      case 'inicio':
        return (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Flujo Interactivo para Determinar su Rol en Protección de Datos (Ley 21.719)
              </h1>
              <Link 
                to="/"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Repositorio
              </Link>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-yellow-800 font-medium mb-2">Aviso Legal Importante</p>
                  <p className="text-yellow-700 text-sm">
                    Esta es una herramienta de orientación y no constituye asesoramiento legal. 
                    La Ley 21.719 es compleja y su aplicación depende del análisis fáctico de cada caso. 
                    Se recomienda encarecidamente validar sus conclusiones con un abogado experto.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Este flujo le guiará a través de una serie de preguntas para ayudarle a determinar si su 
              organización actúa como <strong>Responsable</strong>, <strong>Encargado</strong> o <strong>Corresponsable</strong> 
              para una actividad específica de tratamiento de datos.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-blue-800 text-sm">
                <strong>Importante:</strong> Responda a cada pregunta pensando en una sola actividad de tratamiento 
                a la vez (ej: gestión de nóminas, campaña de marketing, videovigilancia).
              </p>
            </div>
            <AnswerButton onClick={() => setCurrentStep('q1_1')}>
              Comenzar evaluación
            </AnswerButton>
          </div>
        );

      case 'q1_1':
        return (
          <QuestionCard 
            title="PASO 1: ÁMBITO DE APLICACIÓN - Pregunta 1.1"
            helpText="'Tratar' incluye recolectar, guardar, usar, compartir, etc. 'No doméstico' significa que está relacionado con una actividad comercial, profesional o institucional."
          >
            <p className="text-gray-700 mb-6">
              ¿Su organización trata datos personales de personas naturales en un contexto que 
              <strong> NO es exclusivamente personal o doméstico</strong>?
            </p>
            <AnswerButton onClick={() => handleAnswer('q1_1', 'si')}>
              SÍ - Tratamos datos en contexto comercial/profesional
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q1_1', 'no')} variant="secondary">
              NO - Solo tratamos datos en contexto personal/doméstico
            </AnswerButton>
          </QuestionCard>
        );

      case 'q1_2':
        return (
          <QuestionCard 
            title="PASO 1: ÁMBITO DE APLICACIÓN - Pregunta 1.2"
          >
            <BackButton onClick={() => setCurrentStep('q1_1')} />
            <p className="text-gray-700 mb-6">
              ¿El tratamiento de datos que realiza cumple al menos una de las siguientes condiciones territoriales?
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Su organización está establecida en Chile</li>
              <li>Trata datos a nombre de un responsable establecido en Chile</li>
              <li>Ofrece bienes/servicios o monitorea el comportamiento de personas que están en Chile</li>
            </ul>
            <AnswerButton onClick={() => handleAnswer('q1_2', 'si')}>
              SÍ - Cumple al menos una condición
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q1_2', 'no')} variant="secondary">
              NO - No cumple ninguna condición
            </AnswerButton>
          </QuestionCard>
        );

      case 'q2_1':
        return (
          <QuestionCard 
            title="PASO 2: LA DECISIÓN FUNDAMENTAL - Pregunta 2.1"
            helpText="'Medios Esenciales' son decisiones estratégicas, no solo técnicas. Incluyen definir: las categorías de datos a tratar, las categorías de personas afectadas, el período de conservación y las categorías de terceros a quienes se les pueden comunicar los datos."
          >
            <BackButton onClick={() => setCurrentStep('q1_2')} />
            <p className="text-gray-700 mb-6">
              Para esta actividad de tratamiento, ¿su organización toma las decisiones finales y determinantes sobre el 
              <strong> PROPÓSITO</strong> (el porqué se tratan los datos) Y sobre los <strong>MEDIOS ESENCIALES</strong> 
              (el qué, quién, por cuánto tiempo y con quién se comparten los datos)?
            </p>
            <AnswerButton onClick={() => handleAnswer('q2_1', 'si')}>
              SÍ - Decidimos tanto el propósito como los medios esenciales
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q2_1', 'no')} variant="secondary">
              NO - No decidimos ambos aspectos
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q2_1', 'nosé')} variant="warning">
              NO SÉ - No estoy seguro
            </AnswerButton>
            
            {showFactors && (
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-4">Factores para ayudar a decidir:</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li><strong>Beneficio:</strong> ¿Su organización obtiene un beneficio que va más allá del simple pago por un servicio?</li>
                  <li><strong>Autonomía/Rol:</strong> ¿El tratamiento es inherente a su rol profesional donde actúa con independencia?</li>
                  <li><strong>Relación con titular:</strong> ¿Tiene relación directa con las personas cuyos datos se tratan?</li>
                  <li><strong>Iniciativa:</strong> ¿Su organización inició el tratamiento por voluntad propia?</li>
                </ul>
                <p className="mt-3 text-sm text-blue-600">
                  Después de reflexionar, vuelva a responder la pregunta principal.
                </p>
              </div>
            )}
          </QuestionCard>
        );

      case 'q3_1':
        return (
          <QuestionCard 
            title="PASO 3: ANÁLISIS DEL ROL DE RESPONSABLE - Pregunta 3.1"
            helpText="Piense si el tratamiento sería posible o tendría sentido sin la participación de la otra entidad. ¿Ambas se benefician de un propósito común o de propósitos tan ligados que son interdependientes? (Ej: campaña de marketing co-brandeada, investigación científica conjunta, plataforma tecnológica usada en común)."
          >
            <BackButton onClick={() => setCurrentStep('q2_1')} />
            <p className="text-gray-700 mb-6">
              En la determinación de los fines y medios esenciales, ¿participa otra organización de tal forma que 
              las decisiones de ambas son conjuntas, complementarias o inseparables para que el tratamiento se realice?
            </p>
            <AnswerButton onClick={() => handleAnswer('q3_1', 'si')}>
              SÍ - Participamos conjuntamente con otra organización
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q3_1', 'no')} variant="secondary">
              NO - Actuamos de forma independiente
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q3_1', 'nosé')} variant="warning">
              NO SÉ - La situación no es clara
            </AnswerButton>
          </QuestionCard>
        );

      case 'q4_1':
        return (
          <QuestionCard 
            title="PASO 4: ANÁLISIS DEL ROL DE ENCARGADO - Pregunta 4.1"
            helpText="¿Su función se limita a ejecutar lo que su cliente (el Responsable) le pide, sin añadir propósitos propios? ¿Existe un contrato que define estas instrucciones?"
          >
            <BackButton onClick={() => setCurrentStep('q2_1')} />
            <p className="text-gray-700 mb-6">
              ¿El tratamiento de datos que realiza es estrictamente <strong>"por cuenta de"</strong> otra organización 
              y siguiendo sus instrucciones documentadas?
            </p>
            <AnswerButton onClick={() => handleAnswer('q4_1', 'si')}>
              SÍ - Actuamos por cuenta de otro y seguimos sus instrucciones
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q4_1', 'no')} variant="secondary">
              NO - No seguimos instrucciones de otro
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q4_1', 'nosé')} variant="warning">
              NO SÉ - La relación no está clara
            </AnswerButton>
          </QuestionCard>
        );

      case 'q4_2':
        return (
          <QuestionCard 
            title="PASO 4: ANÁLISIS DEL ROL DE ENCARGADO - Pregunta 4.2"
          >
            <BackButton onClick={() => setCurrentStep('q4_1')} />
            <p className="text-gray-700 mb-6">
              ¿Utiliza los datos que le entregó el Responsable para algún fin propio y adicional, 
              no contemplado en las instrucciones? (Ej: Usar la base de datos de un cliente para hacer marketing 
              para otro cliente, o para mejorar sus propios productos).
            </p>
            <AnswerButton onClick={() => handleAnswer('q4_2', 'si')}>
              SÍ - Usamos los datos para fines propios adicionales
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q4_2', 'no')} variant="secondary">
              NO - Solo usamos los datos según las instrucciones
            </AnswerButton>
          </QuestionCard>
        );

      // Resultados finales
      case 'fin_domestico':
        return (
          <ResultCard 
            title="FIN DEL FLUJO - Uso Personal/Doméstico" 
            type="info"
          >
            <p>
              Sus actividades parecen estar fuera del ámbito principal de la Ley 21.719 por ser de 
              carácter personal o doméstico. No requiere continuar con el análisis.
            </p>
          </ResultCard>
        );

      case 'fin_territorial':
        return (
          <ResultCard 
            title="FIN DEL FLUJO - Fuera del Ámbito Territorial" 
            type="info"
          >
            <p>
              La ley podría no aplicarle por razones de ámbito territorial. Se recomienda un análisis 
              legal específico si tiene dudas sobre su situación particular.
            </p>
          </ResultCard>
        );

      case 'resultado_a':
        return (
          <ResultCard 
            title="RESPONSABLE ÚNICO DEL TRATAMIENTO" 
            type="success"
            nextSteps={[
              "Asegurar una base de licitud para cada tratamiento (ej. consentimiento, contrato)",
              "Implementar y documentar todas las medidas de seguridad técnicas y organizativas",
              "Crear procedimientos para gestionar los derechos de los titulares (acceso, rectificación, supresión, etc.)",
              "Si contrata a un Encargado, debe formalizar un contrato que cumpla con el Art. 15 bis"
            ]}
          >
            <p>
              Usted determina solo los fines y medios del tratamiento. Tiene la máxima responsabilidad y debe 
              ser capaz de demostrar el cumplimiento de todos los principios y obligaciones de la Ley 21.719.
            </p>
          </ResultCard>
        );

      case 'resultado_b':
        return (
          <ResultCard 
            title="CORRESPONSABLE DEL TRATAMIENTO (CONTROLADOR CONJUNTO)" 
            type="success"
            nextSteps={[
              "Obligatorio: Establecer un acuerdo de corresponsabilidad por escrito con la(s) otra(s) entidad(es)",
              "El acuerdo debe asignar transparentemente las responsabilidades de cada uno",
              "Informar a los titulares sobre la 'esencia' de este acuerdo y designar un punto de contacto",
              "Recuerde que un titular puede ejercer sus derechos contra cualquiera de los corresponsables"
            ]}
          >
            <p>
              Usted determina los fines y medios esenciales junto con otra u otras organizaciones. 
              Ambos comparten la responsabilidad sobre el tratamiento.
            </p>
          </ResultCard>
        );

      case 'resultado_c':
        return (
          <ResultCard 
            title="ENCARGADO DEL TRATAMIENTO (PROCESADOR)" 
            type="success"
            nextSteps={[
              "Asegurar que existe un contrato escrito con el Responsable que cumple el Art. 15 bis",
              "Tratar los datos únicamente según las instrucciones documentadas",
              "Implementar medidas de seguridad apropiadas y mantener confidencialidad",
              "No subcontratar sin autorización previa y por escrito del Responsable"
            ]}
          >
            <p>
              Usted trata datos por cuenta y bajo las instrucciones de un Responsable. Su rol es de servicio 
              y no tiene autonomía sobre los fines del tratamiento.
            </p>
          </ResultCard>
        );

      case 'resultado_d':
        return (
          <ResultCard 
            title="ROL HÍBRIDO Y POTENCIAL INFRACCIÓN" 
            type="warning"
            nextSteps={[
              "Separar y documentar: Identifique qué tratamiento hace como Encargado y cuál como Responsable",
              "Legalizar su rol de Responsable: Para el tratamiento con fines propios, cumplir obligaciones del Responsable",
              "Obtener base de licitud válida para el tratamiento adicional",
              "Ser transparente con los titulares sobre este uso adicional de sus datos"
            ]}
          >
            <p>
              Usted actúa como Encargado para las tareas instruidas, pero al usar los datos para fines propios, 
              se convierte en Responsable para ese tratamiento adicional. Esto es riesgoso si no cuenta con base legal propia.
            </p>
          </ResultCard>
        );

      case 'resultado_e':
        return (
          <ResultCard 
            title="ROL INDETERMINADO" 
            type="error"
            nextSteps={[
              "Acción Urgente: Buscar asesoría legal especializada para analizar sus actividades",
              "Formalizar relaciones contractuales y definir roles claramente",
              "Principio de Responsabilidad: En caso de duda, asumir las obligaciones del Responsable",
              "Documentar todos los tratamientos y sus bases legales"
            ]}
          >
            <p>
              No fue posible determinar su rol con claridad. Esta ambigüedad es un riesgo de cumplimiento 
              significativo. Actuar sin un rol definido puede llevar a vulneraciones de la ley y sanciones.
            </p>
          </ResultCard>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto">
        {renderStep()}
      </div>
    </div>
  );
};

export default FlujoProteccionDatos;