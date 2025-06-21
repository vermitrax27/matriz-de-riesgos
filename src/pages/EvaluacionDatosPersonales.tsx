import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle, XCircle, HelpCircle, ArrowRight, ArrowLeft, Home, Database, Shield, Eye, Users, BarChart3, FileText, Search } from 'lucide-react';

const EvaluacionDatosPersonalesExtendida = () => {
  const [currentStep, setCurrentStep] = useState('inicio');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checkboxAnswers, setCheckboxAnswers] = useState<Record<string, Record<string, boolean>>>({});

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    // Lógica de navegación según las respuestas
    switch (questionId) {
      case 'q1_1':
        if (answer === 'no') {
          setCurrentStep('conclusion_no_personales');
        } else {
          setCurrentStep('q1_2');
        }
        break;
      case 'q1_2':
        if (answer === 'si') {
          setCurrentStep('conclusion_domestico');
        } else {
          setCurrentStep('q2_1');
        }
        break;
      case 'q2_1_check':
        // Evaluar si se marcó alguna casilla en cualquiera de las secciones
        const hasChecked = ['q2_1_identidad', 'q2_1_contacto', 'q2_1_biometricos', 'q2_1_digitales', 'q2_1_institucionales']
          .some(sectionId => Object.values(checkboxAnswers[sectionId] || {}).some(checked => checked));
        if (hasChecked) {
          setCurrentStep('conclusion_identificados');
        } else {
          setCurrentStep('q3_1');
        }
        break;
      case 'q3_1':
        if (answer === 'si') {
          setCurrentStep('q3_2');
        } else {
          setCurrentStep('q4_1');
        }
        break;
      case 'q3_2':
        setCurrentStep('q3_3');
        break;
      case 'q3_3':
        if (answer === 'si') {
          setCurrentStep('conclusion_seudonimizados');
        } else {
          setCurrentStep('q4_1');
        }
        break;
      case 'q4_1_check':
        const hasCuasi = ['q4_1_demograficos', 'q4_1_laborales', 'q4_1_socioeconomicos', 'q4_1_tecnicos']
          .some(sectionId => Object.values(checkboxAnswers[sectionId] || {}).some(checked => checked));
        if (hasCuasi) {
          setCurrentStep('q4_2');
        } else {
          setCurrentStep('q5_1');
        }
        break;
      case 'q4_2':
        if (answer === 'si') {
          setCurrentStep('q4_3');
        } else {
          setCurrentStep('conclusion_individualizacion');
        }
        break;
      case 'q4_3':
        if (answer === 'si') {
          setCurrentStep('conclusion_vinculacion');
        } else {
          setCurrentStep('q4_4');
        }
        break;
      case 'q4_4':
        if (answer === 'si') {
          setCurrentStep('q5_1');
        } else {
          setCurrentStep('conclusion_inferencia');
        }
        break;
      case 'q5_1_check':
        const hasAnonTechniques = Object.values(checkboxAnswers['q5_1_tecnicas'] || {}).some(checked => checked);
        if (hasAnonTechniques) {
          setCurrentStep('q5_2');
        } else {
          setCurrentStep('conclusion_sin_tecnicas');
        }
        break;
      case 'q5_2':
        if (answer === 'si') {
          setCurrentStep('conclusion_final_anonimo');
        } else {
          setCurrentStep('conclusion_sin_evaluacion');
        }
        break;
    }
  };

  const handleCheckboxAnswer = (questionId: string, checkboxId: string, checked: boolean) => {
    setCheckboxAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [checkboxId]: checked
      }
    }));
  };

  const resetFlow = () => {
    setCurrentStep('inicio');
    setAnswers({});
    setCheckboxAnswers({});
  };

  const BackButton = ({ onClick }: { onClick: () => void }) => (
    <button 
      onClick={onClick}
      className="flex items-center text-purple-600 hover:text-purple-800 mb-4"
    >
      <ArrowLeft className="w-4 h-4 mr-1" />
      Volver
    </button>
  );

  interface StepCardProps {
    stepNumber: string;
    title: string;
    children: React.ReactNode;
    helpText?: string;
    icon?: React.ComponentType<{ className?: string }>;
  }

  const StepCard = ({ stepNumber, title, children, helpText, icon: Icon }: StepCardProps) => (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
      <div className="flex items-start mb-4">
        {Icon && <Icon className="w-6 h-6 text-purple-600 mr-3 mt-1" />}
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded mr-3">
              PASO {stepNumber}
            </span>
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          </div>
          {children}
        </div>
      </div>
      {helpText && (
        <div className="mt-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
          <div className="flex items-start">
            <HelpCircle className="w-5 h-5 text-purple-600 mr-2 mt-0.5" />
            <div className="text-sm text-purple-800">
              <strong>Ayuda:</strong> {helpText}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const CheckboxSection = ({ title, items, questionId, onContinue }: { title: string; items: string[]; questionId: string; onContinue: () => void }) => (
    <div className="mt-6">
      <h4 className="font-semibold text-gray-800 mb-3">{title}</h4>
      <div className="space-y-2 mb-4">
        {items.map((item, index) => (
          <label key={index} className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              checked={checkboxAnswers[questionId]?.[`item_${index}`] || false}
              onChange={(e) => handleCheckboxAnswer(questionId, `item_${index}`, e.target.checked)}
            />
            <span className="text-sm text-gray-700">{item}</span>
          </label>
        ))}
      </div>
      <button
        onClick={onContinue}
        className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors"
      >
        Continuar evaluación
      </button>
    </div>
  );

  const AnswerButton = ({ onClick, children, variant = 'primary' }: { onClick: () => void; children: React.ReactNode; variant?: 'primary' | 'secondary' | 'warning' }) => {
    const baseClasses = "w-full p-4 rounded-lg font-medium transition-colors mb-3 text-left";
    const variants = {
      primary: "bg-purple-600 text-white hover:bg-purple-700",
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

  interface ConclusionCardProps {
    title: string;
    type: 'success' | 'warning' | 'error' | 'info' | 'critical';
    level?: string;
    children: React.ReactNode;
    recommendation?: string;
    action?: string;
    warning?: string;
  }

  const ConclusionCard = ({ title, type, level, children, recommendation, action, warning }: ConclusionCardProps) => {
    const typeStyles = {
      success: { bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle, color: 'text-green-600' },
      warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: AlertTriangle, color: 'text-yellow-600' },
      error: { bg: 'bg-red-50', border: 'border-red-200', icon: XCircle, color: 'text-red-600' },
      info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: Database, color: 'text-blue-600' },
      critical: { bg: 'bg-red-50', border: 'border-red-200', icon: Shield, color: 'text-red-600' }
    };
    
    const style = typeStyles[type];
    const Icon = style.icon;
    
    return (
      <div className={`${style.bg} ${style.border} border rounded-lg p-6 max-w-5xl mx-auto`}>
        <div className="flex items-start mb-4">
          <Icon className={`w-6 h-6 ${style.color} mr-3 mt-1`} />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
            
            {level && (
              <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700 mb-4">
                Nivel de Identificabilidad: {level}
              </div>
            )}
            
            <div className="text-gray-700 mb-4">{children}</div>
            
            {recommendation && (
              <div className="bg-white p-4 rounded-lg border-l-4 border-blue-400 mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Conclusión:</h3>
                <p className="text-gray-700 text-sm">{recommendation}</p>
              </div>
            )}
            
            {action && (
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400 mb-4">
                <h3 className="font-semibold text-red-800 mb-2">Acción Requerida:</h3>
                <p className="text-red-700 text-sm">{action}</p>
              </div>
            )}
            
            {warning && (
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mb-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Advertencia:</h3>
                <p className="text-yellow-700 text-sm">{warning}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Documentación Obligatoria:</h3>
          <p className="text-gray-700 text-sm">
            Guarde un registro de este cuestionario, los análisis que realizó, las técnicas que aplicó, 
            los umbrales que usó y su evaluación de riesgo final. Esta documentación es su principal 
            defensa bajo el principio de responsabilidad.
          </p>
        </div>
        
        <div className="flex space-x-4">
          <button 
            onClick={resetFlow}
            className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Evaluar nuevo dataset
          </button>
          <Link 
            to="/"
            className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
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
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Search className="w-8 h-8 text-purple-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-800">
                  Formulario Extendido: Análisis Detallado de Datos Personales
                </h1>
              </div>
              <Link 
                to="/"
                className="flex items-center text-purple-600 hover:text-purple-800"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Repositorio
              </Link>
            </div>
            
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
              <p className="text-purple-800 text-sm">
                <strong>Versión Extendida para Analistas:</strong> Este formulario es una guía de análisis profundo, 
                diseñada para ayudarle a determinar con un alto grado de detalle si su proyecto involucra 
                "datos personales" bajo la Ley N° 21.719.
              </p>
            </div>

            <p className="text-gray-600 mb-6">
              La ley chilena define "dato personal" como cualquier información sobre una persona natural identificada 
              o identificable. El término <strong>"identificable"</strong> es el núcleo de este análisis. Los avances 
              en Big Data e IA hacen que la reidentificación sea un riesgo dinámico y creciente, difuminando la línea 
              entre lo anónimo y lo personal.
            </p>

            <div className="grid lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Evaluación Técnica</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Identificadores directos e indirectos</li>
                  <li>• Técnicas de seudonimización</li>
                  <li>• Cuasi-identificadores complejos</li>
                  <li>• Análisis de riesgo contextual</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Riesgos Evaluados</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Individualización (singling out)</li>
                  <li>• Vinculación (linkability)</li>
                  <li>• Inferencia de atributos sensibles</li>
                  <li>• Análisis del contexto de uso</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Técnicas Formales</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• K-anonimato, l-diversidad</li>
                  <li>• Privacidad diferencial</li>
                  <li>• Generalización y supresión</li>
                  <li>• Evaluación de riesgo residual</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-yellow-800 font-medium mb-2">Marco Metodológico</p>
                  <p className="text-yellow-700 text-sm">
                    Este flujo le guiará a través de la evaluación de identificadores directos, seudónimos, 
                    cuasi-identificadores y las técnicas formales de anonimización, para que pueda tomar una 
                    decisión informada y documentada.
                  </p>
                </div>
              </div>
            </div>

            <AnswerButton onClick={() => setCurrentStep('q1_1')}>
              <div className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Iniciar análisis detallado del dataset
              </div>
            </AnswerButton>
          </div>
        );

      case 'q1_1':
        return (
          <StepCard 
            stepNumber="1"
            title="Filtro Inicial - Naturaleza y Ámbito de los Datos"
            icon={Database}
            helpText="La ley se centra en personas naturales. Si su dataset contiene exclusivamente información sobre empresas (personas jurídicas), productos, sensores, eventos climáticos o entidades abstractas, y ninguna de esa información puede ser vinculada a un individuo, la ley no aplica."
          >
            <p className="text-gray-700 mb-6">
              ¿La unidad mínima de análisis en su dataset (ej. cada fila) representa a una <strong>persona natural</strong> (un individuo humano vivo)?
            </p>
            <AnswerButton onClick={() => handleAnswer('q1_1', 'si')}>
              SÍ - Cada registro representa a una persona natural
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q1_1', 'no')} variant="secondary">
              NO - Los datos se refieren a empresas, objetos o entidades abstractas
            </AnswerButton>
          </StepCard>
        );

      case 'q1_2':
        return (
          <StepCard 
            stepNumber="1"
            title="Filtro Inicial - Ámbito de Uso"
            icon={Users}
            helpText="Analizar sus propias finanzas personales en una planilla está exento. Analizar los datos de compra de clientes para optimizar el inventario de su empresa no lo está."
          >
            <BackButton onClick={() => setCurrentStep('q1_1')} />
            <p className="text-gray-700 mb-6">
              ¿El propósito de su análisis es estrictamente para un <strong>uso personal o doméstico</strong>, 
              completamente desvinculado de cualquier actividad comercial, profesional, académica o institucional?
            </p>
            <AnswerButton onClick={() => handleAnswer('q1_2', 'si')}>
              SÍ - Es para uso exclusivamente personal/doméstico
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q1_2', 'no')} variant="secondary">
              NO - Es para actividad comercial, profesional o institucional
            </AnswerButton>
          </StepCard>
        );

      case 'q2_1':
        return (
          <StepCard 
            stepNumber="2"
            title="Evaluación de Identificadores Directos"
            icon={Eye}
          >
            <BackButton onClick={() => setCurrentStep('q1_2')} />
            <p className="text-gray-700 mb-4">
              ¿Su dataset contiene alguna de las siguientes columnas o campos en un formato legible o fácilmente reversible?
            </p>
            
            <CheckboxSection
              title="Datos de Identidad Civil"
              items={[
                "Nombre y Apellido(s) completos",
                "Rol Único Nacional (RUT)",
                "Número de Pasaporte, Cédula de Identidad u otro documento nacional",
                "Número de licencia de conducir"
              ]}
              questionId="q2_1_identidad"
              onContinue={() => {}}
            />
            
            <CheckboxSection
              title="Datos de Contacto"
              items={[
                "Dirección de correo electrónico que permita identificar a la persona",
                "Número de teléfono fijo o móvil",
                "Dirección postal completa y exacta (calle, número, comuna, ciudad)"
              ]}
              questionId="q2_1_contacto"
              onContinue={() => {}}
            />
            
            <CheckboxSection
              title="Datos Biométricos y Genéticos"
              items={[
                "Imágenes faciales nítidas",
                "Registros de huellas dactilares",
                "Patrones de reconocimiento de iris o retina",
                "Registros de voz",
                "Secuencias completas o parciales de ADN/ARN"
              ]}
              questionId="q2_1_biometricos"
              onContinue={() => {}}
            />
            
            <CheckboxSection
              title="Identificadores Únicos Digitales y Físicos"
              items={[
                "Nombres de usuario o 'handles' de redes sociales",
                "Dirección IP estática o registro de IPs dinámicas asociadas",
                "Dirección MAC de un dispositivo",
                "Número IMEI o IMSI de un dispositivo móvil",
                "Placa patente de un vehículo personal"
              ]}
              questionId="q2_1_digitales"
              onContinue={() => {}}
            />
            
            <CheckboxSection
              title="Identificadores Institucionales"
              items={[
                "Número de ficha clínica o de historia médica",
                "Número de estudiante o de funcionario",
                "Número de cliente, póliza de seguro o cuenta bancaria"
              ]}
              questionId="q2_1_institucionales"
              onContinue={() => handleAnswer('q2_1_check', 'completed')}
            />
          </StepCard>
        );

      case 'q3_1':
        return (
          <StepCard 
            stepNumber="3"
            title="Evaluación de Datos Seudonimizados"
            icon={Shield}
            helpText="Por ejemplo, en lugar de 'Juan Pérez', la fila contiene el código 'Participante_1138'; en lugar del RUT, contiene el hash A87FBC.... Este proceso es la seudonimización."
          >
            <BackButton onClick={() => setCurrentStep('q2_1')} />
            <p className="text-gray-700 mb-6">
              ¿Los identificadores directos (la lista del Paso 2) fueron <strong>eliminados del dataset y reemplazados</strong> 
              por un identificador artificial (ej. un código, token, alias, o hash)?
            </p>
            <AnswerButton onClick={() => handleAnswer('q3_1', 'si')}>
              SÍ - Los identificadores fueron seudonimizados
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q3_1', 'no')} variant="secondary">
              NO - No hay proceso de seudonimización
            </AnswerButton>
          </StepCard>
        );

      case 'q3_2':
        return (
          <StepCard 
            stepNumber="3"
            title="Robustez de la Seudonimización"
            icon={Shield}
            helpText="Un simple número correlativo (1, 2, 3...) es una seudonimización débil. Un hash criptográfico con 'sal' (salt) o un sistema de tokenización gestionado por un tercero son técnicas mucho más fuertes."
          >
            <BackButton onClick={() => setCurrentStep('q3_1')} />
            <p className="text-gray-700 mb-6">
              ¿La técnica de seudonimización utilizada es <strong>computacionalmente robusta</strong>?
            </p>
            <AnswerButton onClick={() => handleAnswer('q3_2', 'si')}>
              SÍ - Se usaron técnicas criptográficas o de tokenización robustas
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q3_2', 'no')} variant="warning">
              NO - Se usó un método simple o no conozco la robustez
            </AnswerButton>
          </StepCard>
        );

      case 'q3_3':
        return (
          <StepCard 
            stepNumber="3"
            title="Evaluación de Reversibilidad"
            icon={Shield}
            helpText="La ley chilena es clara: mientras exista la posibilidad de revertir la seudonimización usando información adicional mantenida por separado, el dato sigue siendo personal."
          >
            <BackButton onClick={() => setCurrentStep('q3_2')} />
            <p className="text-gray-700 mb-6">
              ¿Existe en su organización, o en la del proveedor de datos, una <strong>"tabla de enlace"</strong> 
              o cualquier tipo de información que permita vincular de vuelta el seudónimo con la identidad real de la persona?
            </p>
            <AnswerButton onClick={() => handleAnswer('q3_3', 'si')}>
              SÍ - Existe una tabla de enlace reversible
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q3_3', 'no')} variant="secondary">
              NO - La tabla de enlace fue destruida permanentemente e irreversiblemente
            </AnswerButton>
          </StepCard>
        );

      case 'q4_1':
        return (
          <StepCard 
            stepNumber="4"
            title="Evaluación de Identificadores Indirectos (Cuasi-identificadores)"
            icon={Search}
          >
            <BackButton onClick={() => setCurrentStep(answers['q3_3'] ? 'q3_3' : 'q2_1')} />
            <p className="text-gray-700 mb-4">
              ¿Su dataset contiene <strong>cuasi-identificadores</strong> (atributos que combinados pueden aislar a un individuo)? 
              Revise la siguiente lista de ejemplos:
            </p>
            
            <CheckboxSection
              title="Datos Demográficos"
              items={[
                "Fecha de nacimiento completa o parcial (año/mes)",
                "Edad o rango de edad",
                "Código postal, comuna, región o zona geográfica",
                "Género / Sexo",
                "Nacionalidad / Etnia / Pertenencia a pueblo indígena",
                "Estado civil"
              ]}
              questionId="q4_1_demograficos"
              onContinue={() => {}}
            />
            
            <CheckboxSection
              title="Datos Laborales y Educacionales"
              items={[
                "Profesión, ocupación o cargo",
                "Industria o sector económico",
                "Nombre del empleador (incluso si es una empresa)",
                "Nivel educacional más alto alcanzado",
                "Institución educativa a la que asistió"
              ]}
              questionId="q4_1_laborales"
              onContinue={() => {}}
            />
            
            <CheckboxSection
              title="Datos Socioeconómicos y de Comportamiento"
              items={[
                "Rango de ingresos",
                "Historial de compras o transacciones",
                "Propiedad de bienes (ej. tipo de vivienda, vehículo)",
                "Información sobre afiliación a sindicatos, partidos políticos, etc."
              ]}
              questionId="q4_1_socioeconomicos"
              onContinue={() => {}}
            />
            
            <CheckboxSection
              title="Datos de Contexto Técnico"
              items={[
                "Fechas y horas exactas de eventos (ej. fecha de admisión hospitalaria)",
                "Datos de geolocalización (coordenadas, celdas de torre de celular)"
              ]}
              questionId="q4_1_tecnicos"
              onContinue={() => handleAnswer('q4_1_check', 'completed')}
            />
          </StepCard>
        );

      case 'q4_2':
        return (
          <StepCard 
            stepNumber="4"
            title="Evaluación de Riesgo de Individualización (Singling Out)"
            icon={Users}
            helpText="Ejecute una consulta GROUP BY con 3 o 4 cuasi-identificadores y cuente (COUNT). Si algún grupo tiene un COUNT = 1, ha individualizado a una persona. Modelos como k-anonimato buscan que cada grupo tenga un tamaño mínimo de 'k' (ej. k=5)."
          >
            <BackButton onClick={() => setCurrentStep('q4_1')} />
            <p className="text-gray-700 mb-6">
              ¿Ha realizado un análisis para determinar si una combinación de los cuasi-identificadores presentes 
              en su dataset podría crear un <strong>"grupo de anonimato" de tamaño 1</strong> (es decir, aislar a un único individuo)?
            </p>
            <AnswerButton onClick={() => handleAnswer('q4_2', 'si')}>
              SÍ - He realizado el análisis y ningún individuo puede ser aislado únicamente
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q4_2', 'no')} variant="secondary">
              NO - No he realizado este análisis, o encontré individuos únicos
            </AnswerButton>
          </StepCard>
        );

      case 'q4_3':
        return (
          <StepCard 
            stepNumber="4"
            title="Evaluación de Riesgo de Vinculación (Linkability)"
            icon={Database}
            helpText="Este es un juicio contextual. Un dataset de pacientes de un hospital con 'código postal, fecha de nacimiento y género' puede ser vinculable con el padrón electoral. El riesgo aumenta dramáticamente con la riqueza de los cuasi-identificadores."
          >
            <BackButton onClick={() => setCurrentStep('q4_2')} />
            <p className="text-gray-700 mb-6">
              Considerando las fuentes de datos públicas (registros profesionales, redes sociales, noticias) 
              o privadas a las que un tercero podría acceder, ¿es <strong>razonablemente probable</strong> que alguien 
              pueda cruzar su dataset con otra fuente para reidentificar a los individuos?
            </p>
            <AnswerButton onClick={() => handleAnswer('q4_3', 'si')}>
              SÍ - Existe un riesgo realista y significativo de vinculación
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q4_3', 'no')} variant="secondary">
              NO - He analizado el contexto y el riesgo de vinculación es remotamente bajo
            </AnswerButton>
          </StepCard>
        );

      case 'q4_4':
        return (
          <StepCard 
            stepNumber="4"
            title="Evaluación de Riesgo de Inferencia de Atributos Sensibles"
            icon={Eye}
            helpText="Si en un grupo de 5 personas k-anónimas, las 5 tienen el mismo diagnóstico, un atacante que sepa que 'Juan' está en ese grupo, inferirá su diagnóstico. Modelos como l-diversidad o t-cercanía están diseñados para evitar esto."
          >
            <BackButton onClick={() => setCurrentStep('q4_3')} />
            <p className="text-gray-700 mb-6">
              Si su dataset contiene atributos sensibles (salud, opinión política, etc.), ¿ha verificado que, 
              dentro de cada grupo de individuos "similares" (o k-anónimos), existe <strong>suficiente diversidad</strong> 
              en los valores sensibles para que no se pueda inferir el atributo de un individuo específico?
            </p>
            <AnswerButton onClick={() => handleAnswer('q4_4', 'si')}>
              SÍ - El riesgo de inferencia de atributos sensibles ha sido mitigado
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q4_4', 'no')} variant="secondary">
              NO - No he analizado este riesgo, o existe un riesgo de inferencia
            </AnswerButton>
          </StepCard>
        );

      case 'q5_1':
        return (
          <StepCard 
            stepNumber="5"
            title="Auditoría de Técnicas de Anonimización y Documentación"
            icon={FileText}
            helpText="La anonimización efectiva es un proceso técnico deliberado, no la simple eliminación de nombres. Debe poder demostrar qué técnica usó y por qué es efectiva."
          >
            <BackButton onClick={() => setCurrentStep('q4_4')} />
            <p className="text-gray-700 mb-4">
              ¿Puede documentar con precisión las <strong>técnicas de anonimización formales</strong> que aplicó al dataset? 
              Marque todas las que correspondan:
            </p>
            
            <CheckboxSection
              title="Técnicas de Anonimización Aplicadas"
              items={[
                "Generalización: Reemplazar valores específicos por categorías más amplias",
                "Supresión: Eliminar completamente columnas o celdas específicas",
                "Perturbación: Añadir ruido aleatorio a los datos numéricos",
                "Microagregación: Reemplazar grupos de registros por un registro promedio",
                "Privacidad Diferencial: Para consultas agregadas, se añadió ruido calibrado"
              ]}
              questionId="q5_1_tecnicas"
              onContinue={() => handleAnswer('q5_1_check', 'completed')}
            />
          </StepCard>
        );

      case 'q5_2':
        return (
          <StepCard 
            stepNumber="5"
            title="Evaluación Formal del Riesgo Residual"
            icon={Shield}
            helpText="Este es el núcleo del enfoque basado en riesgos y del marco de los 'Five Safes'. La anonimización no es absoluta, es la reducción del riesgo a un nivel trivial en un contexto específico."
          >
            <BackButton onClick={() => setCurrentStep('q5_1')} />
            <p className="text-gray-700 mb-6">
              ¿Ha realizado una <strong>evaluación formal del riesgo residual</strong>, considerando el contexto de uso 
              (quién verá los datos, en qué entorno, con qué propósito) y ha concluido y documentado que el riesgo 
              de reidentificación es aceptablemente bajo?
            </p>
            <AnswerButton onClick={() => handleAnswer('q5_2', 'si')}>
              SÍ - He realizado y documentado la evaluación de riesgo contextual
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q5_2', 'no')} variant="secondary">
              NO - No he realizado esta evaluación formal
            </AnswerButton>
          </StepCard>
        );

      // Conclusiones extendidas
      case 'conclusion_no_personales':
        return (
          <ConclusionCard 
            title="NO SON DATOS PERSONALES" 
            type="success"
            level="N/A - Fuera del ámbito de la ley"
            recommendation="Sus datos no son datos personales. No requiere continuar con el análisis ni aplicar las obligaciones de la Ley 21.719."
          >
            <p>
              Los datos que maneja se refieren exclusivamente a entidades que no son personas naturales 
              (empresas, objetos, conceptos abstractos), por lo que están fuera del ámbito de aplicación 
              de la legislación de protección de datos personales.
            </p>
          </ConclusionCard>
        );

      case 'conclusion_domestico':
        return (
          <ConclusionCard 
            title="USO DOMÉSTICO - EXENTO DE OBLIGACIONES PRINCIPALES" 
            type="info"
            level="Personal/Doméstico - Exento"
            recommendation="Sus actividades están exentas de las principales obligaciones de la ley por tratarse de uso exclusivamente personal o doméstico."
          >
            <p>
              El tratamiento de datos personales para fines exclusivamente personales o domésticos está 
              expresamente exento de las obligaciones principales de la Ley 21.719, siempre que no tenga 
              conexión con actividades comerciales, profesionales o institucionales.
            </p>
          </ConclusionCard>
        );

      case 'conclusion_identificados':
        return (
          <ConclusionCard 
            title="DATOS PERSONALES IDENTIFICADOS" 
            type="critical"
            level="Máximo - Directamente Identificables"
            recommendation="Usted está tratando DATOS PERSONALES IDENTIFICADOS. Su dataset se encuentra en el extremo más sensible del espectro de identificabilidad. El tratamiento requiere el cumplimiento estricto de todas las obligaciones de la Ley 21.719."
            action="Debe aplicar inmediatamente todas las medidas de protección requeridas por la ley, incluyendo la obtención de una base de licitud válida (como el consentimiento) y la implementación de estrictas medidas de seguridad técnicas y organizativas."
          >
            <p>
              Su dataset contiene identificadores directos que permiten conocer inmediatamente y sin 
              ambigüedad la identidad de las personas. Este es el nivel más alto de riesgo y requiere 
              el cumplimiento completo y estricto de todas las obligaciones legales.
            </p>
          </ConclusionCard>
        );

      case 'conclusion_seudonimizados':
        return (
          <ConclusionCard 
            title="DATOS PERSONALES SEUDONIMIZADOS" 
            type="warning"
            level="Alto - Seudonimizados pero Reversibles"
            recommendation="Usted está tratando DATOS PERSONALES SEUDONIMIZADOS. A pesar de las medidas de seguridad, este dataset está explícitamente cubierto por la Ley 21.719. Aunque el riesgo inmediato es menor que con datos identificados, debe aplicar todas las obligaciones de la ley, prestando especial atención a la seguridad de la 'tabla de enlace'."
            action="Implemente medidas adicionales de seguridad para proteger la tabla de enlace y considere si es necesario mantener la reversibilidad de la seudonimización para los fines de su proyecto."
          >
            <p>
              La seudonimización es una excelente medida de seguridad que reduce significativamente el 
              riesgo de exposición, pero la ley es explícita: mientras exista la posibilidad de reversión, 
              los datos mantienen su carácter personal.
            </p>
          </ConclusionCard>
        );

      case 'conclusion_individualizacion':
        return (
          <ConclusionCard 
            title="DATOS PERSONALES - RIESGO DE INDIVIDUALIZACIÓN" 
            type="error"
            level="Medio-Alto - Indirectamente Identificables"
            recommendation="Sus datos deben ser tratados como DATOS PERSONALES. La capacidad de individualizar a una persona es un claro indicador de que es 'identificable'. Debe aplicar técnicas de anonimización (como las del Paso 5) o gestionar el dataset bajo la Ley 21.719."
            action="Aplique inmediatamente técnicas de k-anonimato (k≥5) para asegurar que ningún individuo pueda ser aislado de forma única, o trate el dataset como datos personales con todas las obligaciones correspondientes."
          >
            <p>
              El análisis ha identificado que su dataset permite la individualización de personas específicas 
              a través de combinaciones únicas de atributos. Esto constituye una forma de identificación 
              indirecta que convierte los datos en personales.
            </p>
          </ConclusionCard>
        );

      case 'conclusion_vinculacion':
        return (
          <ConclusionCard 
            title="DATOS PERSONALES - RIESGO DE VINCULACIÓN" 
            type="error"
            level="Medio-Alto - Vinculables con Fuentes Externas"
            recommendation="Sus datos deben ser tratados como DATOS PERSONALES. La probabilidad de vinculación es un factor determinante para considerar a una persona 'identificable'. Debe mitigar este riesgo o gestionar los datos como personales."
            action="Reduzca la granularidad de los cuasi-identificadores (generalización) o implemente medidas que hagan inviable la vinculación con fuentes externas. Alternativamente, gestione el dataset bajo el marco completo de la Ley 21.719."
          >
            <p>
              Existe un riesgo realista y significativo de que su dataset pueda ser vinculado con fuentes 
              de datos externas para reidentificar a los individuos. Esta posibilidad de vinculación 
              convierte los datos en identificables indirectamente.
            </p>
          </ConclusionCard>
        );

      case 'conclusion_inferencia':
        return (
          <ConclusionCard 
            title="DATOS PERSONALES - RIESGO DE INFERENCIA SENSIBLE" 
            type="error"
            level="Alto - Permite Inferencia de Atributos Sensibles"
            recommendation="Sus datos deben ser tratados como DATOS PERSONALES, especialmente por contener datos sensibles. La inferencia de atributos es un daño a la privacidad tan significativo como la reidentificación directa."
            action="Implemente técnicas de l-diversidad o t-cercanía para asegurar que exista suficiente variabilidad en los atributos sensibles dentro de cada grupo de individuos similares, o gestione el dataset como datos personales."
          >
            <p>
              El dataset permite la inferencia de información nueva y potencialmente sensible sobre 
              individuos específicos. Aunque no se pueda identificar directamente a las personas, 
              la capacidad de inferir atributos sensibles constituye un riesgo significativo para la privacidad.
            </p>
          </ConclusionCard>
        );

      case 'conclusion_sin_tecnicas':
        return (
          <ConclusionCard 
            title="DATOS PERSONALES - FALTA DE TÉCNICAS FORMALES" 
            type="warning"
            level="Indeterminado - Sin Anonimización Formal"
            recommendation="Sus datos deben ser tratados como DATOS PERSONALES. Un dataset 'crudo', incluso sin identificadores directos, rara vez es anónimo. Sin la aplicación deliberada de estas técnicas, el riesgo de reidentificación sigue siendo alto."
            action="Aplique técnicas formales de anonimización documentadas (generalización, supresión, k-anonimato, etc.) antes de considerar el dataset como anónimo, o gestione los datos bajo el marco completo de la Ley 21.719."
          >
            <p>
              Aunque el análisis de riesgo básico no identificó problemas evidentes, la ausencia de 
              técnicas formales de anonimización significa que no se puede garantizar que el riesgo 
              de reidentificación sea suficientemente bajo.
            </p>
          </ConclusionCard>
        );

      case 'conclusion_sin_evaluacion':
        return (
          <ConclusionCard 
            title="DATOS PERSONALES - SIN EVALUACIÓN DE RIESGO CONTEXTUAL" 
            type="warning"
            level="Indeterminado - Sin Análisis de Riesgo"
            recommendation="Sus datos deben ser tratados como DATOS PERSONALES. La anonimización no puede declararse sin una evaluación de riesgo contextual. Si no se ha hecho este análisis, debe asumir por defecto que los datos siguen siendo personales."
            action="Realice una evaluación formal de riesgo que considere el contexto específico de uso (audiencia, entorno, propósito, medidas de seguridad adicionales) antes de considerar el dataset como funcionalmente anónimo."
          >
            <p>
              Aunque se aplicaron técnicas de anonimización, la ausencia de una evaluación de riesgo 
              contextual impide determinar si el riesgo residual es aceptablemente bajo para el contexto 
              específico de su proyecto.
            </p>
          </ConclusionCard>
        );

      case 'conclusion_final_anonimo':
        return (
          <ConclusionCard 
            title="DATOS FUNCIONALMENTE ANONIMIZADOS" 
            type="success"
            level="Bajo - Funcionalmente Anónimos en Contexto"
            recommendation="Si ha respondido SÍ a las preguntas 5.1 y 5.2, ha seguido un proceso técnico y metodológico robusto. Puede defender razonablemente que su dataset está funcionalmente anonimizado para el contexto específico de su proyecto."
            action="Documente todo el proceso. Guarde un registro de este cuestionario, los análisis que realizó, las técnicas que aplicó, los umbrales que usó (ej. valor de 'k') y su evaluación de riesgo final. Esta documentación es su principal defensa y prueba de diligencia bajo el principio de responsabilidad."
          >
            <p>
              La aplicación de técnicas formales de anonimización combinada con una evaluación de riesgo 
              contextual respalda la conclusión de que el dataset está funcionalmente anonimizado para 
              su contexto específico de uso. Sin embargo, mantenga vigilancia sobre cambios en el contexto 
              que puedan alterar esta evaluación.
            </p>
          </ConclusionCard>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4">
      <div className="container mx-auto">
        {renderStep()}
      </div>
    </div>
  );
};

export default EvaluacionDatosPersonalesExtendida;