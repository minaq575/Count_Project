import styles from "@/app/styles/layou.module.css"
export default function Layout({ children }){
    return(
        <div className={styles.backdrop}>
            <div className={styles.box}>
                <div className={styles.img}></div>
                <div className={styles.box_right}>
                    <div className={styles.text}>
                    {children}
                    </div>
                    
                </div>
            </div>
            </div>
    )
}