import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export function DeletePopOver({id, title}: {id: string, title: string}) {

  const hanldeDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    fetch('http://localhost:8080/data/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()).then(res => {
      res.code == 200 ? window.location.href = '/' : toast({title: "failed delete", description: res.error})
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin</AlertDialogTitle>
          <AlertDialogDescription>
            aktifitas ini akan menghapus catatan anda dengan judul <p className="underline">{title}</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={hanldeDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
