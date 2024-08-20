import styles from "./App.module.scss";
import ResizableContainer from "./components/ResizableContainer";

function App() {
  return (
    <div className={styles.outerContainer}>
      <ResizableContainer
        direction="right"
        minSize={24}
        maxSize={200}
        boundSize={50}
        storageKey="resizeable-container"
        toggleKey="["
        childWrapperClassName={styles.childWrapper}
        containerClassName={styles.containerTest}
      >
        <div className={styles.container}>
          <ul></ul>
        </div>
      </ResizableContainer>
    </div>
  );
}

export default App;
