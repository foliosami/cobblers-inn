import useEditMode from "./hooks/useEditMode";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import ContactFooter from "./components/ContactFooter";
import AiEditPanel from "./components/AiEditPanel";

export default function App() {
  const {
    editMode,
    toggleEdit,
    content,
    selectedField,
    selectField,
    dismissPanel,
    runAiEdit,
    applyEdit,
    streaming,
    streamedText,
    pendingApply,
    error,
  } = useEditMode();

  const sectionProps = {
    content,
    editMode,
    selectedId: selectedField?.id || null,
    onSelect: selectField,
  };

  return (
    <div className={editMode ? "edit-on" : undefined}>
      <div className="grain" aria-hidden="true" />
      <Nav editMode={editMode} onToggleEdit={toggleEdit} />
      <main>
        <Hero {...sectionProps} />
        <About {...sectionProps} />
        <Services {...sectionProps} />
        <Testimonials {...sectionProps} />
        <FAQ {...sectionProps} />
        <ContactFooter {...sectionProps} />
      </main>
      <AiEditPanel
        selectedField={selectedField}
        streaming={streaming}
        streamedText={streamedText}
        pendingApply={pendingApply}
        error={error}
        onClose={dismissPanel}
        onSubmit={runAiEdit}
        onApply={applyEdit}
      />
    </div>
  );
}
