export default function log(msg: string): void {
    console.log(new Date().toISOString(), msg);
}