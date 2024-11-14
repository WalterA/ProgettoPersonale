import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Creazione del dizionario
        Map<String, List<String>> dizionario = new HashMap<>();

        // Aggiunta di elementi al dizionario
        dizionario.put("frutta", new ArrayList<>(Arrays.asList("mela", "banana", "arancia")));
        dizionario.put("verdura", new ArrayList<>(Arrays.asList("carota", "broccoli", "spinaci")));

        // Metodo per aggiungere un valore al dizionario
        aggiungiValore(dizionario, "frutta", "pera");
        aggiungiValore(dizionario, "verdura", "pomodoro");
        aggiungiValore(dizionario, "cereali", "riso");

        // Stampa del dizionario
        for (Map.Entry<String, List<String>> entry : dizionario.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }

    public static void aggiungiValore(Map<String, List<String>> dizionario, String chiave, String valore) {
        // Controlla se la chiave è già presente nel dizionario
        if (dizionario.containsKey(chiave)) {
            // Aggiungi il valore alla lista esistente
            dizionario.get(chiave).add(valore);
        } else {
            // Crea una nuova lista e aggiungi il valore
            List<String> nuovaLista = new ArrayList<>();
            nuovaLista.add(valore);
            dizionario.put(chiave, nuovaLista);
        }
    }
}




